import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useCart } from "../Contexts/CartContext"
import { supabase } from "../lib/supabaseClient"
import { IsRealCheckoutEnabled } from "../lib/realCheckoutFlag"
import ShippingAddressForm, { EmptyShippingAddress, IsShippingAddressComplete } from "../Components/ShippingAddressForm"
import Title from "../Components/Title"
import "./Cart.css"

function Cart() {
  const { cartItems, RemoveFromCart, UpdateQuantity, GetCartTotal, ClearCart } = useCart();
  const navigate = useNavigate();
  const [address, setAddress] = useState(EmptyShippingAddress);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const realCheckoutEnabled = IsRealCheckoutEnabled();

  const subtotal = GetCartTotal();
  // Preview only - highest single item's postage, matching the server-side calculation. The
  // actual charge is always computed server-side from products.postage, not sent from here.
  const postage = Math.max(0, ...cartItems.map((item) => item.postage ?? 0));
  const total = subtotal + postage;

  // Real Square Sandbox checkout - only reachable via ?realCheckout=1 (see realCheckoutFlag.js).
  async function HandleRealCheckout() {
    const { data, error } = await supabase.functions.invoke("create-checkout", {
      body: {
        items: cartItems.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        shippingAddress: address,
      },
    });

    if (error) {
      // supabase-js doesn't auto-parse a non-2xx response body into `data` - read it off error.context instead.
      let message = error.message;
      try {
        const body = await error.context.json();
        if (body?.error) message = body.error;
      } catch {
        // no JSON body available - stick with the generic message
      }
      setError(message);
      setSubmitting(false);
      return;
    }

    if (!data?.checkoutUrl) {
      setError("Something went wrong starting checkout.");
      setSubmitting(false);
      return;
    }

    window.location.href = data.checkoutUrl;
  }

  // Default for everyone else - place_order checks + decrements stock atomically, no real payment.
  async function HandleFakeCheckout() {
    const { data: orderId, error } = await supabase.rpc("place_order", {
      p_items: cartItems.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      p_shipping_address: address,
    });

    if (error) {
      setError(error.message);
      setSubmitting(false);
      return;
    }

    ClearCart();
    navigate(`/marsh-makes-glass/order/${orderId}`);
  }

  async function HandleCheckoutClick() {
    setError(null);

    if (!IsShippingAddressComplete(address)) {
      setError("Please fill in your shipping address before checking out.");
      return;
    }

    setSubmitting(true);
    await (realCheckoutEnabled ? HandleRealCheckout() : HandleFakeCheckout());
  }

  if (cartItems.length === 0) {
    return (
      <>
        <Title text="Your Cart" />
        <div className="page-body">
          <p className="no-results">Your cart is empty.</p>
        </div>
      </>
    )
  }

  return (
    <>
      <Title text="Your Cart" />

      <div className="page-body cart">
        {cartItems.map((item) => (
          <div className="cart-item" key={item.id}>
            <img src={item.thumbnail_url} alt={item.name} />

            <div className="cart-item-details">
              <h3>{item.name}</h3>
              <p className="cart-price">£{item.price.toFixed(2)}</p>

              <div className="quantity-controls">
                <button onClick={() => UpdateQuantity(item.id, item.quantity - 1)}>−</button>
                <span>{item.quantity}</span>
                <button onClick={() => UpdateQuantity(item.id, item.quantity + 1)}>+</button>
              </div>

              <button className="remove-button" onClick={() => RemoveFromCart(item.id)}>
                Remove
              </button>
            </div>
          </div>
        ))}

        <ShippingAddressForm address={address} onChange={setAddress} />

        <div className="cart-summary">
          <div className="cart-summary-line"><span>Subtotal</span><span>£{subtotal.toFixed(2)}</span></div>
          <div className="cart-summary-line"><span>P&amp;P</span><span>£{postage.toFixed(2)}</span></div>
          <p className="cart-total">Total: £{total.toFixed(2)}</p>

          {error && <p className="cart-error">{error}</p>}

          {realCheckoutEnabled && <p className="real-checkout-notice">Real Square Sandbox checkout enabled</p>}

          <button className="checkout-button" onClick={HandleCheckoutClick} disabled={submitting}>
            {submitting
              ? (realCheckoutEnabled ? "Redirecting to checkout..." : "Placing order...")
              : (realCheckoutEnabled ? "Checkout" : "Complete Order (test)")}
          </button>
        </div>
      </div>
    </>
  )
}

export default Cart

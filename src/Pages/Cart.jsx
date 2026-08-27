import { useState } from "react"
import { useCart } from "../Contexts/CartContext"
import { supabase } from "../lib/supabaseClient"
import { IsRealCheckoutEnabled } from "../lib/realCheckoutFlag"
import Title from "../Components/Title"
import "./Cart.css"

function Cart() {
  const { cartItems, RemoveFromCart, UpdateQuantity, GetCartTotal, ClearCart } = useCart();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [orderComplete, setOrderComplete] = useState(false);
  const realCheckoutEnabled = IsRealCheckoutEnabled();

  // Real Square Sandbox checkout - only reachable via ?realCheckout=1 (see realCheckoutFlag.js).
  async function HandleRealCheckout() {
    setSubmitting(true);
    setError(null);

    const { data, error } = await supabase.functions.invoke("create-checkout", {
      body: {
        items: cartItems.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
      },
    });

    if (error) {
      setSubmitting(false);
      // supabase-js doesn't auto-parse a non-2xx response body into `data` - read it off error.context instead.
      let message = error.message;
      try {
        const body = await error.context.json();
        if (body?.error) message = body.error;
      } catch {
        // no JSON body available - stick with the generic message
      }
      setError(message);
      return;
    }

    if (!data?.checkoutUrl) {
      setSubmitting(false);
      setError("Something went wrong starting checkout.");
      return;
    }

    window.location.href = data.checkoutUrl;
  }

  // Default for everyone else - place_order checks + decrements stock atomically, no real payment.
  async function HandleFakeCheckout() {
    setSubmitting(true);
    setError(null);

    const { error } = await supabase.rpc("place_order", {
      p_items: cartItems.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      p_total: GetCartTotal(),
    });

    setSubmitting(false);

    if (error) {
      setError(error.message);
    } else {
      ClearCart();
      setOrderComplete(true);
    }
  }

  const HandleCheckout = realCheckoutEnabled ? HandleRealCheckout : HandleFakeCheckout;

  if (orderComplete) {
    return (
      <>
        <Title text="Your Cart" />
        <div className="page-body">
          <p className="no-results">
            Test order placed! This didn't charge anything real - it just recorded the order and updated stock, so we can check the flow works.
          </p>
        </div>
      </>
    )
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

        <div className="cart-summary">
          <p className="cart-total">Total: £{GetCartTotal().toFixed(2)}</p>

          {error && <p className="cart-error">{error}</p>}

          {realCheckoutEnabled && <p className="real-checkout-notice">Real Square Sandbox checkout enabled</p>}

          <button className="checkout-button" onClick={HandleCheckout} disabled={submitting}>
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
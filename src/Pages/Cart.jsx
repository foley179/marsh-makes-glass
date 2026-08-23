import { useState } from "react"
import { useCart } from "../Contexts/CartContext"
import { supabase } from "../lib/supabaseClient"
import Title from "../Components/Title"
import "./Cart.css"

function Cart() {
  const { cartItems, RemoveFromCart, UpdateQuantity, GetCartTotal } = useCart();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Calls the create-checkout Edge Function, which records a "pending" order and asks Square for a hosted checkout page, then sends the
  // browser there. Stock isn't touched here - it only gets decremented once Square confirms the payment actually completed (see the
  // square-webhook function), so an abandoned checkout doesn't affect stock. The cart is deliberately left alone until then too, in case
  // the customer comes back without having paid.
  async function HandleCheckout() {
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
      // supabase-js doesn't auto-parse the JSON body of a non-2xx Edge Function response into `data`
      // it has to be read off the error's response context to get our actual error message instead of a generic one.
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

          <button className="checkout-button" onClick={HandleCheckout} disabled={submitting}>
            {submitting ? "Redirecting to checkout..." : "Checkout"}
          </button>
        </div>
      </div>
    </>
  )
}

export default Cart
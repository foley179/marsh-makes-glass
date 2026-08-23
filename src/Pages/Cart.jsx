import { useState } from "react"
import { Link } from "react-router-dom"
import { useCart } from "../Contexts/CartContext"
import { supabase } from "../lib/supabaseClient"
import Title from "../Components/Title"
import "./Cart.css"

function Cart() {
  const { cartItems, RemoveFromCart, UpdateQuantity, GetCartTotal, ClearCart } = useCart();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [orderComplete, setOrderComplete] = useState(false);

  // Calls the place_order RPC, which checks stock and decrements it for
  // every item in one atomic operation - either the whole order goes
  // through or none of it does. This is a test/"fake" checkout (no real
  // payment yet) so an order is recorded but nothing is actually charged.
  async function HandleCompleteOrder() {
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

          <button className="checkout-button" onClick={HandleCompleteOrder} disabled={submitting}>
            {submitting ? "Placing order..." : "Complete Order (test)"}
          </button>
        </div>
      </div>
    </>
  )
}

export default Cart
import { Link } from "react-router-dom"
import { useCart } from "../Contexts/CartContext"
import Title from "../Components/Title"
import "./Cart.css"

function Cart() {
  const { cartItems, RemoveFromCart, UpdateQuantity, GetCartTotal } = useCart();

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

  /**
   * TODO:: 
   * - Add a "Additional Notes" section. So if the user wants a specific piece (if there is multiple) they can easily request it from there.
   * - Add numbers in the top corner of the images so the user can easily identify which piece they want to request.
   * - If product qty is 0, have a warning that it will be made to order and will take time to complete. (on the details page too)
   */

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
        </div>
      </div>
    </>
  )
}

export default Cart
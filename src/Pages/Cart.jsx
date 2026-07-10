import { Link } from "react-router-dom"
import { useCart } from "../Contexts/CartContext"
import Title from "../components/Title"
import "./Cart.css"

function Cart() {
  const { cartItems, RemoveFromCart, UpdateQuantity, GetCartTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <>
        <Title text="Your Cart" />
        <div className="page-body">
          <p className="no-results">Your cart is empty.</p>
          <Link to="/marsh-makes-glass/products" className="back-button">Browse the collection</Link>
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
            <img src={import.meta.env.BASE_URL + item.thumbnailPath} alt={item.name} />

            <div className="cart-item-details">
              <h3>{item.name}</h3>
              <p className="price">£{item.price.toFixed(2)}</p>

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
import { useCart } from "../Contexts/CartContext"
import "./AddToCartButton.css"

function AddToCartButton({ product }) {
  const { AddToCart } = useCart()

  function HandleClick() {
    AddToCart(product)
  }

  return (
    <button className="add-to-cart-button" onClick={HandleClick}>
      Add to Cart
    </button>
  )
}

export default AddToCartButton
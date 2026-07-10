import { useNavigate } from "react-router-dom"
import { useCart } from "../Contexts/CartContext"
import "./AddToCartButton.css"

function AddToCartButton({ product }) {
  const navigate = useNavigate();
  const { cartItems, AddToCart } = useCart();

  const isInCart = cartItems.some((item) => item.id === product.id);

  // If already exists in the cart, redirect to the cart, else add the item
  function HandleClick() {
    if (isInCart) {
      navigate("/marsh-makes-glass/cart");
      return;
    }

    AddToCart(product);
  }

  return (
    <button className={`add-to-cart-button ${isInCart ? "added" : ""}`} onClick={HandleClick}>
      {isInCart ? "Go to Cart" : "Add to Cart"}
    </button>
  )
}

export default AddToCartButton
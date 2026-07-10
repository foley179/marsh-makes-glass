import { useParams, useNavigate, Link } from "react-router-dom"
import products from "../data/products.json"
import Title from '../Components/Title'
import './ProductDetails.css'

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  function FindProduct() {
    return products.find((product) => product.id === id);
  };

  const product = FindProduct();

  if (!product) {
    return <p className="no-results">Sorry, we couldn't find that piece.</p>
  }

  const { name, category, dimensions, fullDescription, price, image } = product;
  const url = import.meta.env.BASE_URL + image;

  // Go back if there is a previous page in history, otherwise go to the products page
  function HandleBack() {
    if (window.history.state?.idx > 0)
      navigate(-1);
    else
      navigate("/marsh-makes-glass/products");
  }

  return (
    <>
      <Title text={name} />

      <div className="page-body product-details">
        <img src={url} alt={name} />
        <p>{fullDescription}</p>
        <div>
          <span className="dimensions-label">Dimensions:</span>
          <p className="dimensions">{dimensions}</p>
        </div>
        <p className="price">£{price.toFixed(2)}</p>
        <button className="back-button" onClick={HandleBack}>← Back to products</button>
      </div>
    </>
  )
}

export default ProductDetails
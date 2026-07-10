import { useParams, useNavigate, Link } from "react-router-dom"
import { useState } from "react"
import products from "../data/products.json"
import Title from '../Components/Title'
import './ProductDetails.css'

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(0);

  function FindProduct() {
    return products.find((product) => product.id === id);
  };

  const product = FindProduct();

  if (!product) {
    return <p className="no-results">Sorry, we couldn't find that piece.</p>
  }

  const { name, category, dimensions, fullDescription, price, imagePaths } = product;
  const imageUrl = import.meta.env.BASE_URL + imagePaths[currentImage]; // Use the BASE_URL to construct the full image URL

  // Go back if there is a previous page in history, otherwise go to the products page
  function HandleBack() {
    if (window.history.state?.idx > 0)
      navigate(-1);
    else
      navigate("/marsh-makes-glass/products");
  }

  function HandlePrevImage() {
    setCurrentImage((index) => (index === 0 ? imagePaths.length - 1 : index - 1))
  }

  function HandleNextImage() {
    setCurrentImage((index) => (index === imagePaths.length - 1 ? 0 : index + 1))
  }

  return (
    <>
      <Title text={name} />

      <div className="page-body product-details">
        <div className="image-carousel">
          {imagePaths.length > 1 && (
            <button className="carousel-arrow carousel-prev" onClick={HandlePrevImage} aria-label="Previous image">
              ‹
            </button>
          )}

          <img src={imageUrl} alt={`${name} — image ${currentImage + 1} of ${imagePaths.length}`} />

          {imagePaths.length > 1 && (
            <button className="carousel-arrow carousel-next" onClick={HandleNextImage} aria-label="Next image">
              ›
            </button>
          )}
        </div>

        {imagePaths.length > 1 && (
          <div className="carousel-dots">
            {imagePaths.map((image, index) => (
              <button
                key={image}
                className={`carousel-dot ${index === currentImage ? "active" : ""}`}
                onClick={() => setCurrentImage(index)}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}

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
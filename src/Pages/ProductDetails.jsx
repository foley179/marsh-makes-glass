import { useParams, useNavigate, Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { supabase } from "../lib/supabaseClient"
import Title from '../Components/Title'
import AddToCartButton from "../Components/AddToCartButton"
import CustomOrderRequest from "../Components/CustomOrderRequest"
import './ProductDetails.css'

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(0);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setCurrentImage(0);

    async function FetchProduct() {
      const { data, error } = await supabase.from("products").select("*").eq("id", id).maybeSingle();

      if (cancelled)
         return;

      if (error)
        setError(error);
      else
        setProduct(data);
      
      setLoading(false);
    }

    FetchProduct();

    return () => { cancelled = true; };
  }, [id]);

  if (loading) {
    return <p className="no-results">Loading piece...</p>
  }

  if (error || !product) {
    return <p className="no-results">Sorry, we couldn't find that piece.</p>
  }

  const { name, category, dimensions, full_description, price, image_urls, stock_quantity } = product;
  const imageUrl = image_urls[currentImage]; // already a full Supabase Storage URL
  const outOfStock = stock_quantity === 0;

  // Go back if there is a previous page in history, otherwise go to the products page
  function HandleBack() {
    if (window.history.state?.idx > 0)
      navigate(-1);
    else
      navigate("/marsh-makes-glass/products");
  }

  // NOTE:: For now we only have arrows for now, we can add "swipe" functionality later. Would be a nice for mobile users, but not essential.
  function HandlePrevImage() {
    setCurrentImage((index) => (index === 0 ? image_urls.length - 1 : index - 1))
  }

  function HandleNextImage() {
    setCurrentImage((index) => (index === image_urls.length - 1 ? 0 : index + 1))
  }

  return (
    <>
      <Title text={name} />

      <div className="page-body product-details">
        {outOfStock && <span className="stock-badge-inline">Out of stock</span>}

        <div className="image-carousel">
          {image_urls.length > 1 && (
            <button className="carousel-arrow carousel-prev" onClick={HandlePrevImage} aria-label="Previous image">
              ‹
            </button>
          )}

          <img src={imageUrl} alt={`${name} — image ${currentImage + 1} of ${image_urls.length}`} />

          {image_urls.length > 1 && (
            <button className="carousel-arrow carousel-next" onClick={HandleNextImage} aria-label="Next image">
              ›
            </button>
          )}
        </div>

        {image_urls.length > 1 && (
          <div className="carousel-dots">
            {image_urls.map((image, index) => (
              <button
                key={image}
                className={`carousel-dot ${index === currentImage ? "active" : ""}`}
                onClick={() => setCurrentImage(index)}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}

        <p>{full_description}</p>
        <div>
          <span className="dimensions-label">Dimensions:</span>
          <p className="dimensions">{dimensions}</p>
        </div>
        <p className="price">£{price.toFixed(2)}</p>
        {outOfStock ? <CustomOrderRequest product={product} /> : <AddToCartButton product={product} />}
        <button className="back-button" onClick={HandleBack}>← Back to products</button>
      </div>
    </>
  )
}

export default ProductDetails
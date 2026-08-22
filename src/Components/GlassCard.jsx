import { NavLink } from "react-router-dom"
import "./GlassCard.css"

function GlassCard({ product }) {
  const { name, category, brief_description, price, thumbnail_url, id, stock_quantity } = product;
  const navUrl = `/marsh-makes-glass/product/${id}`;
  const outOfStock = stock_quantity === 0;

  return (
    <div className="glass-card">
      <NavLink to={navUrl}>
        {outOfStock && <span className="stock-badge">Out of stock</span>}
        <img src={thumbnail_url} alt={name} />
        <h3>{name}</h3>
        <div className="category-tags">
          {category.map((cat) => (
            <span className="category-tag" key={cat}>{cat}</span>
          ))}
        </div>
        <p>{brief_description}</p>
        <p className="price">£{price.toFixed(2)}</p>
      </NavLink>
    </div>
  )
}

export default GlassCard
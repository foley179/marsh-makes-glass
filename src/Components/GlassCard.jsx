import { NavLink } from "react-router-dom"
import "./GlassCard.css"

function GlassCard({ product }) {
  const { name, category, briefDescription, price, thumbnailPath, id } = product;
  const filePath = import.meta.env.BASE_URL + thumbnailPath; // Use the BASE_URL to construct the full image URL
  const navUrl = `/marsh-makes-glass/product/${id}`;

  return (
    <div className="glass-card">
      <NavLink to={navUrl}>
        <img src={filePath} alt={name} />
        <h3>{name}</h3>
        <div className="category-tags">
          {category.map((cat) => (
            <span className="category-tag" key={cat}>{cat}</span>
          ))}
        </div>
        <p>{briefDescription}</p>
        <p className="price">£{price.toFixed(2)}</p>
      </NavLink>
    </div>
  )
}

export default GlassCard
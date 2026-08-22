import { NavLink } from "react-router-dom"
import "./GlassCard.css"

function GlassCard({ product }) {
  const { name, category, brief_description, price, thumbnail_url, id } = product;
  const navUrl = `/marsh-makes-glass/product/${id}`;

  return (
    <div className="glass-card">
      <NavLink to={navUrl}>
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
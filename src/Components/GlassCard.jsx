import "./GlassCard.css"

function GlassCard({ name, category, description, price, image }) {
  const url = import.meta.env.BASE_URL + image; // Use the BASE_URL to construct the full image URL

  return (
    <div className="glass-card">
      <img src={url} alt={name} />
      <h3>{name}</h3>
      <div className="category-tags">
        {category.map((cat) => (
          <span className="category-tag" key={cat}>{cat}</span>
        ))}
      </div>
      <p>{description}</p>
      <p className="price">£{price.toFixed(2)}</p>
    </div>
  )
}

export default GlassCard
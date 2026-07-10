import "./GlassCard.css"

function GlassCard({ product }) {
  const { name, category, briefDescription, price, image, id } = product;
  const url = import.meta.env.BASE_URL + image; // Use the BASE_URL to construct the full image URL

  return (
    <div className="glass-card">
      <a href={`/marsh-makes-glass/product/${id}`}>
        <img src={url} alt={name} />
        <h3>{name}</h3>
        <div className="category-tags">
          {category.map((cat) => (
            <span className="category-tag" key={cat}>{cat}</span>
          ))}
        </div>
        <p>{briefDescription}</p>
        <p className="price">£{price.toFixed(2)}</p>
      </a>
    </div>
  )
}

export default GlassCard
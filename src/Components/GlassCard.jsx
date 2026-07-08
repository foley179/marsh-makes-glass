import "./GlassCard.css"

function GlassCard({img, title, description, price}) {
  const url = import.meta.env.BASE_URL + img; // Use the BASE_URL to construct the full image URL
  
  return (
    <div className="glass-card">
      <img src={url} alt={title} />
      <h3>{title}</h3>
      <p>{description}</p>
      <p className="price">£{price.toFixed(2)}</p>
    </div>
  )
}

export default GlassCard
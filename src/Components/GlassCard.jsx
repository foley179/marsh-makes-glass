import "./GlassCard.css"

function GlassCard({img, title, description, price}) {
  return (
    <div className="glass-card">
      <img src={img} alt={title} />
      <h3>{title}</h3>
      <p>{description}</p>
      <p className="price">£{price.toFixed(2)}</p>
    </div>
  )
}

export default GlassCard
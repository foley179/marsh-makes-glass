import GlassCard from '../Components/GlassCard'

function Home() {
	const glassItems = [
		{ id: 1, img: 'GlassImages/Thumbs/Shark_Small.jpeg', title: 'Shark with background', description: 'This is a description of the shark image', price: 30.00 },
		{ id: 2, img: 'GlassImages/Thumbs/Bee small.jpeg', title: 'Bee', description: 'This is a description of the bee image', price: 20.00 },
	]
	// vid = 44:40
	return (
		<>
			<header className="site-title">
				<h1>Marsh Makes Glass</h1>
			</header>

			<div className="card-grid">
				{glassItems.map((item) => (
					<GlassCard
						key={item.id}
						img={item.img}
						title={item.title}
						description={item.description}
						price={item.price}
					/>
				))}
			</div>
		</>
	)
}

export default Home
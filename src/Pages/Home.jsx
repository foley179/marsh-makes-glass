import ProductList from "../Components/ProductList"
import Title from "../Components/Title"
import EmailLink from "../Components/EmailLink"
import "./Home.css"

function Home() {
	return (
		<>
			<Title text="Marsh Makes Glass" />

      <section className="page-body">
				<h3 className="home-title">Handmade Stained Glass Inspired by the Deep</h3>
				<p className="home-text">
					Welcome to <strong>Marsh Makes Glass</strong>, where every piece is individually handcrafted using traditional stained glass techniques. Inspired by the mystery of the ocean,
					gothic architecture, and the beauty of the natural world, each creation is designed to catch the light and transform it into something extraordinary.
				</p>

				<p className="home-text">
					From graceful sea creatures and botanical designs to custom commissions, every panel is carefully cut, foiled, soldered, and finished by hand. No two pieces are exactly alike,
					making each one a unique work of art.
				</p>

				<p className="home-text">
					Whether you're looking for a striking window hanging, a thoughtful gift, or a one-of-a-kind statement piece for your home, you'll find handcrafted glass made with care,
					creativity, and attention to detail.
				</p>

				<p className="home-text">
					Explore the collection below, and if you have something special in mind, I'd love to help bring your vision to life
					through a custom commission (<EmailLink subject="Custom Commission">Contact me here</EmailLink>).
				</p>
      </section>
		</>
	)
}

export default Home
import { Route, Routes } from 'react-router-dom'
import { CartProvider } from "./Contexts/CartContext"
import { SyncRealCheckoutFlag } from "./lib/realCheckoutFlag"
import Home from './Pages/Home'
import About from './Pages/About'
import Products from './Pages/Products'
import Navbar from './Components/Navbar'
import SiteBanner from './Components/SiteBanner'
import Contact from './Pages/Contact'
import ProductDetails from './Pages/ProductDetails'
import Cart from './Pages/Cart'
import OrderConfirmation from './Pages/OrderConfirmation'
import './App.css'

SyncRealCheckoutFlag(); // picks up ?realCheckout=1/0 from the URL, if present

function App() {
	return (
		<CartProvider>
			<Navbar />
				<SiteBanner />

			<main className="main-content">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/products" element={<Products />} />
					<Route path="/about" element={<About />} />
					<Route path="/contact" element={<Contact />} />
					<Route path="/product/:id" element={<ProductDetails />} />
					<Route path="/cart" element={<Cart />} />
					<Route path="/order/:orderId" element={<OrderConfirmation />} />
				</Routes>
			</main>
		</CartProvider>
	)
}

export default App
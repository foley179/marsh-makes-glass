import { Route, Routes } from 'react-router-dom'
import { CartProvider } from "./Contexts/CartContext"
import { SyncRealCheckoutFlag } from "./lib/realCheckoutFlag"
import Home from './Pages/Home'
import About from './Pages/About'
import Products from './Pages/Products'
import Navbar from './Components/Navbar'
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

			<main className="main-content">
				<Routes>
					<Route path="/marsh-makes-glass/" element={<Home />} />
					<Route path="/marsh-makes-glass/products" element={<Products />} />
					<Route path="/marsh-makes-glass/about" element={<About />} />
					<Route path="/marsh-makes-glass/contact" element={<Contact />} />
					<Route path="/marsh-makes-glass/product/:id" element={<ProductDetails />} />
					<Route path="/marsh-makes-glass/cart" element={<Cart />} />
					<Route path="/marsh-makes-glass/order/:orderId" element={<OrderConfirmation />} />
				</Routes>
			</main>
		</CartProvider>
	)
}

export default App
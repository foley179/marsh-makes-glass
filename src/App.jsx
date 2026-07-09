import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import About from './Pages/About'
import Products from './Pages/Products'
import Navbar from './Components/Navbar'

function App() {
	return (
		<div>
			<Navbar />

			<main className="main-content">
				<Routes>
					<Route path="/marsh-makes-glass/" element={<Home />} />
					<Route path="/marsh-makes-glass/products" element={<Products />} />
					<Route path="/marsh-makes-glass/about" element={<About />} />
				</Routes>
			</main>
		</div>
	)
}

export default App
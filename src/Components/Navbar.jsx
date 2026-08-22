import { Link, NavLink } from "react-router-dom"
import { useState } from "react"
import { useCart } from "../Contexts/CartContext"
import "./Navbar.css"

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { GetCartCount } = useCart();

  function CloseMenu() {
    setMenuOpen(false);
  }

  function ToggleMenu() {
    setMenuOpen(!menuOpen);
  }

  const cartCount = GetCartCount();

  return (
    <nav className="navbar">
      <NavLink to="/marsh-makes-glass/" className="navbar-home" aria-label="Home" onClick={CloseMenu}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 11.5 12 4l9 7.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </NavLink>

      <div className="navbar-right">
        <NavLink to="/marsh-makes-glass/cart" className="cart-link nav-link" aria-label="Cart" onClick={CloseMenu}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="9" cy="21" r="1" />
            <circle cx="19" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
        </NavLink>

        <button className={`nav-toggle ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation" aria-expanded={menuOpen} >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`navbar-links ${menuOpen ? "open" : ""}`}>
          <NavLink to="/marsh-makes-glass/" className="nav-link" onClick={CloseMenu} end>Home</NavLink>
          <NavLink to="/marsh-makes-glass/products" className="nav-link" onClick={CloseMenu}>Products</NavLink>
          <NavLink to="/marsh-makes-glass/about" className="nav-link" onClick={CloseMenu}>About</NavLink>
          <NavLink to="/marsh-makes-glass/contact" className="nav-link" onClick={CloseMenu}>Contact</NavLink>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
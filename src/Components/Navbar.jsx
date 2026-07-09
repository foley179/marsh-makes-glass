import { Link, NavLink } from "react-router-dom"
import { useState } from "react"
import "./Navbar.css"

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

	/* TODO:: When I get a logo, replace the SVG with an image. For now, I'm using a placeholder image.
	<Link to="/" className="navbar-home" aria-label="Home" onClick={closeMenu}>
		<img src="/logo.png" alt="Marsh Makes Glass" />
	</Link>
	*/

  return (
    <nav className="navbar">
      <Link to="/marsh-makes-glass/" className="navbar-home" aria-label="Home" onClick={closeMenu}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 11.5 12 4l9 7.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>

      <button className={`nav-toggle ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation" aria-expanded={menuOpen} >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div className={`navbar-links ${menuOpen ? "open" : ""}`}>
        <NavLink to="/marsh-makes-glass/" className="nav-link" onClick={closeMenu} end>Home</NavLink>
        <NavLink to="/marsh-makes-glass/products" className="nav-link" onClick={closeMenu}>Products</NavLink>
        <NavLink to="/marsh-makes-glass/about" className="nav-link" onClick={closeMenu}>About</NavLink>
        <NavLink to="/marsh-makes-glass/contact" className="nav-link" onClick={closeMenu}>Contact</NavLink>
      </div>
    </nav>
  )
}

export default Navbar
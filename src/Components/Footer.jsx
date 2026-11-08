import { Link } from "react-router-dom"
import "./Footer.css"

function Footer() {
  return (
    <footer className="site-footer">
      <nav className="footer-links">
        <Link to="/returns">Delivery &amp; Returns</Link>
        <Link to="/privacy">Privacy</Link>
        <Link to="/contact">Contact</Link>
      </nav>

      {/* Slot for trader name/address here, if a business address is ever published. */}

      <p className="footer-copy">&copy; {new Date().getFullYear()} Marsh Makes Glass</p>
    </footer>
  )
}

export default Footer

import { useEffect } from "react"
import { useLocation, useNavigationType } from "react-router-dom"

// New pages open at the top (React Router doesn't do this itself). Back/forward is left alone
// so the browser can restore where you were.
function ScrollToTop() {
  const { pathname } = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    if (navigationType !== "POP")
      window.scrollTo({ top: 0, left: 0, behavior: "instant" }); // instant: the page has smooth scrolling on
  }, [pathname, navigationType]);

  return null
}

export default ScrollToTop

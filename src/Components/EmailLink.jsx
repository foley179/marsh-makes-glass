import "./EmailLink.css"

const CONTACT_EMAIL = "hello@marshmakesglass.com"

function EmailLink({ subject, children }) {
  function BuildMailtoHref() {
    if (!subject) {
      return `mailto:${CONTACT_EMAIL}`;
    }

    return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`
  }

  return (
    <a href={BuildMailtoHref()} className="email-link">
      {children || CONTACT_EMAIL}
    </a>
  )
}

export default EmailLink
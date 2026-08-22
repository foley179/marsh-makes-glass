import EmailLink from "../Components/EmailLink"
import Title from "../Components/Title"
import "./Contact.css"

const SOCIAL_LINKS = [
  { name: "Instagram", url: "https://instagram.com/marshmakesglass" },
  { name: "Facebook", url: "https://facebook.com/marshmakesglass" },
  { name: "Etsy", url: "https://etsy.com/shop/marshmakesglass" },
]

function Contact() {
  return (
    <>
      <Title text="Contact" />

      <section className="page-body">
        <h1 className="contact-title">Get in Touch</h1>

        <p className="contact-text">
          Whether you have a question about a piece, want to talk through a
          commission, or just want to say hello — reach out any time.
        </p>

        <ul className="social-links">
          <EmailLink subject="Enquiry">Email</EmailLink>
          
          {SOCIAL_LINKS.map((social) => (
            <li key={social.name}>
              <a href={social.url} target="_blank" rel="noopener noreferrer">
                {social.name}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}

export default Contact
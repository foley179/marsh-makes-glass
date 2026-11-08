import EmailLink from "../Components/EmailLink"
import Title from "../Components/Title"
import "./Legal.css"

const LAST_UPDATED = "November 2026";

function Privacy() {
  return (
    <>
      <Title text="Privacy" />

      <section className="page-body legal">
        <p>
          This explains what personal information Marsh Makes Glass collects when you order or get
          in touch, why, and what happens to it. I'm a sole trader running a small one-person
          business, and I only collect what I need.
        </p>

        <h2>Who I am</h2>
        <p>
          Marsh Makes Glass is a sole trader business, and I'm responsible for your information. You
          can contact me at <EmailLink subject="Privacy question" />.
        </p>

        <h2>What I collect</h2>
        <ul>
          <li>
            <strong>When you order:</strong> your name, email address, delivery address and what you've ordered.
          </li>
          <li>
            <strong>When you request a custom piece:</strong> your email address and anything you tell me about
            what you'd like.
          </li>
          <li>
            <strong>When you pay:</strong> card and PayPal payments are taken by Square and PayPal on their own
            secure pages. I never see or store your card details or PayPal login. They simply tell me whether
            the payment went through.
          </li>
          <li>
            <strong>Your basket:</strong> it's remembered in your browser's local storage so it's still there if you
            leave and come back. I don't use advertising or tracking cookies.
          </li>
        </ul>

        <h2>Why I use it</h2>
        <ul>
          <li>To process and deliver your order and send you confirmations (I need this to carry out my contract with you).</li>
          <li>To reply to your enquiries and commission requests.</li>
          <li>To keep accounting and tax records, which the law requires.</li>
          <li>To prevent fraud and misuse of the site.</li>
        </ul>

        <h2>Who I share it with</h2>
        <p>
          Only what's needed, and only with the services that help me run the shop: Square and PayPal
          (payments), Supabase (my secure order database), Resend (sending my emails), GitHub (hosting
          the website), and Royal Mail or couriers (delivery, using your name and address). I don't sell
          your information or use it for marketing. Some of these services may handle data outside the UK; where
          they do, they rely on recognised safeguards.
        </p>

        <h2>How long I keep it</h2>
        <p>
          I keep order records for as long as the law requires for tax and accounting purposes (up to six
          years). Enquiries that don't lead to an order are kept only as long as I need to reply to you.
        </p>

        <h2>Your rights</h2>
        <p>
          You can ask to see the information I hold about you, have it corrected, or have it deleted (I may
          need to keep order records for the period above), and you can object to how I use it. Just email me.
        </p>

        <p className="legal-updated">Last updated: {LAST_UPDATED}</p>
      </section>
    </>
  )
}

export default Privacy

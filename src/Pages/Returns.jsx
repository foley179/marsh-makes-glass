import EmailLink from "../Components/EmailLink"
import Title from "../Components/Title"
import { DEPOSIT_PERCENT } from "../lib/commissionTerms"
import "./Legal.css"

// Edit these to match how she actually works.
const DISPATCH_TIME = "5 working days";
const LAST_UPDATED = "November 2026";

function Returns() {
  return (
    <>
      <Title text="Delivery & Returns" />

      <section className="page-body legal">
        <p>
          Everything here is made by hand, so a few things work a little differently
          to a high-street shop. If anything's unclear, please{" "}
          <EmailLink subject="Question before ordering">get in touch</EmailLink> before you order.
        </p>

        <h2>Delivery</h2>
        <p>I currently deliver to addresses in the United Kingdom only.</p>
        <p>
          Postage is shown in your basket before you pay. If you order more than one piece,
          I pack them together and charge postage once, at the highest rate of the pieces
          in your order.
        </p>
        <p>
          I aim to post ready-made pieces within {DISPATCH_TIME} of your order, and in any case
          you'll receive your order within 30 days. Glass is fragile, so everything is wrapped
          carefully before it leaves me. Commissions are different: the timescale is agreed with
          you in writing before you pay a deposit.
        </p>

        <h2>Changing your mind: ready-made pieces</h2>
        <p>You can cancel your order for any reason within 14 days of it being delivered.</p>
        <ul>
          <li>
            To cancel, email me at <EmailLink subject="Cancelling my order" /> saying you'd like
            to cancel, with your order number (it's in your confirmation email).
          </li>
          <li>
            Send the piece back to me within 14 days of telling me. I'll give you the return
            address when you get in touch. You pay the return postage, and I'd recommend a
            tracked and insured service, as the piece is your responsibility until it reaches me.
          </li>
          <li>Please pack it securely and return it unused, in the condition you received it.</li>
          <li>
            I'll refund the price of the piece and the standard postage you paid within 14 days
            of getting it back (or of you showing proof of postage, if that's sooner), to the same
            method you paid with.
          </li>
        </ul>
        <p>
          If a piece is returned damaged because it wasn't packed securely, I may reduce the
          refund to reflect the loss in value.
        </p>

        <h2>Custom commissions</h2>
        <p>
          Commissions are made specially to your requirements, so the 14-day right to cancel above
          doesn't apply once I've started making your piece (the law exempts personalised goods).
          I still want you to be able to change your mind early, so this is how it works:
        </p>
        <ol>
          <li>Send me your idea using the request form or by email, and I'll talk it through with you.</li>
          <li>I agree the design, price and timescale with you in writing.</li>
          <li>
            When you approve the design, a {DEPOSIT_PERCENT}% deposit is due. I start work once
            it's paid.
          </li>
          <li>The balance is due before I post your piece.</li>
        </ol>

        <h3>If you need to cancel a commission</h3>
        <ul>
          <li>
            <strong>Before I've bought materials for your piece or started cutting glass:</strong>{" "}
            you'll get your deposit back in full.
          </li>
          <li>
            <strong>After I've bought materials, but before I start constructing:</strong> you'll
            get your deposit back minus the cost of the materials bought for your piece and a fair
            charge for any work already done. I'll show you the breakdown if you ask.
          </li>
          <li>
            <strong>Once I've started constructing your piece:</strong> it's being made to your
            specification, so it can't be cancelled and the deposit is kept to cover the materials
            and work already done.
          </li>
          <li>If I'm unable to complete your piece, I'll refund everything you've paid.</li>
        </ul>

        <h2>Damaged or faulty pieces</h2>
        <p>
          If your piece arrives damaged or isn't as described, please email me as soon as you can
          with photos of the piece and its packaging, and I'll arrange a replacement or a full
          refund (including postage). This applies to ready-made pieces and commissions alike, and
          it doesn't affect your legal rights.
        </p>

        <h2>Questions?</h2>
        <p>
          Email me at <EmailLink subject="Delivery and returns question" /> and I'll be happy to help.
        </p>

        <p className="legal-updated">Last updated: {LAST_UPDATED}</p>
      </section>
    </>
  )
}

export default Returns

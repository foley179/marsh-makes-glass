import { useState } from "react"
import { Link } from "react-router-dom"
import { supabase } from "../lib/supabaseClient"
import { DEPOSIT_PERCENT } from "../lib/commissionTerms"
import "./CustomOrderRequest.css"

// Shown instead of Add to Cart when out of stock. Just records a request for manual follow-up - nothing committed.
function CustomOrderRequest({ product }) {
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  async function HandleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const { error } = await supabase.rpc("submit_custom_request", {
      p_product_id: product.id,
      p_email: email,
      p_note: note,
    });

    setSubmitting(false);

    if (error) {
      // P0001 = a message we raised on purpose (bad email, throttle...) - safe to show as-is.
      setError(error.code === "P0001" ? error.message : "Sorry, something went wrong sending your request. Please try again.");
    } else {
      setSubmitted(true);
    }
  }

  if (submitted) {
    return (
      <p className="custom-request-success">
        Thanks! Your request has been sent — I'll be in touch by email to confirm details.
      </p>
    )
  }

  return (
    <form className="custom-request-form" onSubmit={HandleSubmit}>
      <p className="custom-request-intro">
        This piece is out of stock, but I may be able to make one to order.
        Let me know your details (and any colour/customisation preferences)
        and I'll get back to you to confirm before anything is agreed.
      </p>

      <p className="custom-request-intro">
        Commissions are made to order. A {DEPOSIT_PERCENT}% deposit is due once you've approved the design, and
        you can cancel for a refund before I start work. Full details in my{" "}
        <Link to="/returns">delivery &amp; returns terms</Link>.
      </p>

      <label htmlFor="custom-request-email">Your email</label>
      <input
        id="custom-request-email"
        type="email"
        required
        maxLength={254}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label htmlFor="custom-request-note">Notes (colours, timing, anything else)</label>
      <textarea
        id="custom-request-note"
        rows={3}
        maxLength={1000}
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />

      {error && <p className="custom-request-error">{error}</p>}

      <button type="submit" className="custom-request-submit" disabled={submitting}>
        {submitting ? "Sending..." : "Request this piece"}
      </button>
    </form>
  )
}

export default CustomOrderRequest

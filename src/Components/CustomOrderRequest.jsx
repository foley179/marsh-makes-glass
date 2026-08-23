import { useState } from "react"
import { supabase } from "../lib/supabaseClient"
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

    const { error } = await supabase.from("orders").insert({
      type: "custom_request",
      status: "pending",
      items: [{ id: product.id, name: product.name, price: product.price, quantity: 1 }],
      customer_email: email,
      customer_note: note,
    });

    setSubmitting(false);

    if (error) {
      setError("Sorry, something went wrong sending your request. Please try again.");
    } else {
      setSubmitted(true);
    }
  }

  if (submitted) {
    return (
      <p className="custom-request-success">
        Thanks! Your request has been sent — we'll be in touch by email to confirm details.
      </p>
    )
  }

  return (
    <form className="custom-request-form" onSubmit={HandleSubmit}>
      <p className="custom-request-intro">
        This piece is out of stock, but we may be able to make one to order.
        Let us know your details (and any colour/customisation preferences)
        and we'll get back to you to confirm before anything is agreed.
      </p>

      <label htmlFor="custom-request-email">Your email</label>
      <input
        id="custom-request-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label htmlFor="custom-request-note">Notes (colours, timing, anything else)</label>
      <textarea
        id="custom-request-note"
        rows={3}
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

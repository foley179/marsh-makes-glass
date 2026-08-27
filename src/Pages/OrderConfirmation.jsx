import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { supabase } from "../lib/supabaseClient"
import { useCart } from "../Contexts/CartContext"
import Title from "../Components/Title"
import "./OrderConfirmation.css"

const POLL_INTERVAL_MS = 2000;
const MAX_POLLS = 5; // covers the webhook-confirmation gap after a real Square payment

function OrderConfirmation() {
  const { orderId } = useParams();
  const { ClearCart } = useCart();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let pollsLeft = MAX_POLLS;

    async function FetchOrder() {
      const { data, error } = await supabase.rpc("get_order", { p_order_id: orderId });

      if (cancelled)
        return;

      if (error || !data) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      setOrder(data);
      setLoading(false);

      // Fake flow clears the cart itself before navigating here - this covers real Square payments.
      if (data.status === "confirmed") {
        ClearCart();
      }

      if (data.status === "pending" && pollsLeft > 0) {
        pollsLeft -= 1;
        setTimeout(FetchOrder, POLL_INTERVAL_MS);
      }
    }

    FetchOrder();

    return () => { cancelled = true; };
    // ClearCart isn't memoized - omitted deliberately, would re-run this effect on every cart change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId]);

  if (loading) {
    return <p className="no-results">Loading order...</p>
  }

  if (notFound || !order) {
    return <p className="no-results">Sorry, we couldn't find that order.</p>
  }

  const subtotal = order.items.reduce((sum, item) => sum + item.price * (item.quantity ?? 1), 0);
  const address = order.shipping_address;
  // Derived from the random id, not order_number, so it doesn't reveal order volume.
  const orderReference = order.id.slice(0, 8).toUpperCase();

  return (
    <>
      <Title text={`Order #${orderReference}`} />

      <div className="page-body invoice">
        {order.status === "pending" && (
          <p className="invoice-pending-notice">
            Confirming your payment - this page will update automatically in a few seconds.
          </p>
        )}

        {order.status === "confirmed" && (
          <p className="invoice-thank-you">
            Thank you for your order! Your piece will be carefully packaged by hand and on its way to you soon.
          </p>
        )}

        <div className="invoice-items">
          {order.items.map((item) => (
            <div className="invoice-item" key={item.id}>
              <span>{item.name} x{item.quantity ?? 1}</span>
              <span>£{(item.price * (item.quantity ?? 1)).toFixed(2)}</span>
            </div>
          ))}
        </div>

        <div className="invoice-totals">
          <div className="invoice-line"><span>Subtotal</span><span>£{subtotal.toFixed(2)}</span></div>
          <div className="invoice-line"><span>P&amp;P</span><span>£{order.postage.toFixed(2)}</span></div>
          <div className="invoice-line invoice-total"><span>Total</span><span>£{order.total.toFixed(2)}</span></div>
        </div>

        {address && (
          <div className="invoice-address">
            <h3>Shipping to</h3>
            <p>{address.name}</p>
            <p>{address.line1}</p>
            {address.line2 && <p>{address.line2}</p>}
            <p>{address.city}, {address.postcode}</p>
            <p>{address.country}</p>
          </div>
        )}

        <p className="invoice-status">Status: {order.status}</p>
      </div>
    </>
  )
}

export default OrderConfirmation

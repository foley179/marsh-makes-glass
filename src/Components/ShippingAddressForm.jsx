import "./ShippingAddressForm.css"

// Controlled form - Cart.jsx owns the state. Used by both checkout flows.
function ShippingAddressForm({ address, onChange }) {
  function HandleFieldChange(field) {
    return (e) => onChange({ ...address, [field]: e.target.value });
  }

  return (
    <div className="shipping-address-form">
      <h3>Shipping address</h3>

      <label htmlFor="shipping-name">Full name</label>
      <input id="shipping-name" type="text" required value={address.name} onChange={HandleFieldChange("name")} />

      <label htmlFor="shipping-line1">Address line 1</label>
      <input id="shipping-line1" type="text" required value={address.line1} onChange={HandleFieldChange("line1")} />

      <label htmlFor="shipping-line2">Address line 2 (optional)</label>
      <input id="shipping-line2" type="text" value={address.line2} onChange={HandleFieldChange("line2")} />

      <label htmlFor="shipping-city">Town / City</label>
      <input id="shipping-city" type="text" required value={address.city} onChange={HandleFieldChange("city")} />

      <label htmlFor="shipping-postcode">Postcode</label>
      <input id="shipping-postcode" type="text" required value={address.postcode} onChange={HandleFieldChange("postcode")} />

      <label htmlFor="shipping-country">Country</label>
      {/* UK-only for now - readOnly rather than removed, so it's a one-line change to open up later. */}
      <input id="shipping-country" type="text" required readOnly value={address.country} className="shipping-country-locked" />
    </div>
  )
}

export function EmptyShippingAddress() {
  return { name: "", line1: "", line2: "", city: "", postcode: "", country: "United Kingdom" };
}

export function IsShippingAddressComplete(address) {
  return Boolean(address.name && address.line1 && address.city && address.postcode && address.country);
}

export default ShippingAddressForm

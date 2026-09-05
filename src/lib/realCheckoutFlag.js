// Dev-only real-checkout toggle (no auth system to gate it behind).
// ?realCheckout=1 shows both real payment buttons (persisted in localStorage),
// ?realCheckout=0 clears it back to the fake flow everyone else always sees.

const STORAGE_KEY = "mmg-real-checkout";

export function SyncRealCheckoutFlag() {
  const params = new URLSearchParams(window.location.search);
  
  if (!params.has("realCheckout"))
    return;

  const enabled = params.get("realCheckout") === "1" || params.get("realCheckout") === "true";
  localStorage.setItem(STORAGE_KEY, enabled ? "true" : "false");
}

export function IsRealCheckoutEnabled() {
  return localStorage.getItem(STORAGE_KEY) === "true";
}

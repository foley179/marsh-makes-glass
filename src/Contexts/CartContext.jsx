import { createContext, useContext, useState, useEffect } from "react"

const CartContext = createContext();
const STORAGE_KEY = "mmg-cart";

function LoadCartFromStorage() {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(LoadCartFromStorage);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  function AddToCart(product) {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === product.id);

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentItems, {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.imagePaths[0],
        quantity: 1,
      }];
    })
  }

  function RemoveFromCart(id) {
    setCartItems((currentItems) => currentItems.filter((item) => item.id !== id));
  }

  function UpdateQuantity(id, quantity) {
    if (quantity < 1) {
      RemoveFromCart(id);
      return;
    }

    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  }

  function ClearCart() {
    setCartItems([]);
  }

  function GetCartTotal() {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  function GetCartCount() {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  }

  const value = {
    cartItems,
    AddToCart,
    RemoveFromCart,
    UpdateQuantity,
    ClearCart,
    GetCartTotal,
    GetCartCount,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

function useCart() {
  return useContext(CartContext);
}

export { CartProvider, useCart }
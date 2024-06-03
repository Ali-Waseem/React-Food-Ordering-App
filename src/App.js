import { useState } from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  }

  const hideCartHandler = () => {
    setCartIsShown(false);
  }

  return (
    // CartProvider is a CONTEXT (used to share same data to multiple components)
    // CONTEXT NEED TO WRAP ALL THE CONPONENTS WHERE DATA NEEDS TO BE SHARED
    <CartProvider>
      {cartIsShown && <Cart hideCart={hideCartHandler} />}
      <Header showCart={showCartHandler}/>
      <main>
      <Meals/>
      </main>
    </CartProvider>
  );
}

export default App;

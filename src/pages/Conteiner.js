import { useState } from 'react';
import Home from './Home';
import Basket from './Basket';

function Container() {
  const [cart, setCart] = useState([]);

  const handleAddToCart = (urun) => {
    setCart([...cart, urun]);
    console.log('Ürün sepete eklendi:', urun);
  };

  return (
    <div>
      <Home cart={cart} handleAddToCart={handleAddToCart} />
      <Basket cart={cart} />
    </div>
  );
}

export default Container;
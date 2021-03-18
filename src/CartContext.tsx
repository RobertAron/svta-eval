import React, { useContext, useState } from 'react'
import { matress } from './MattressChoseComponent';
// Make sure the shape of the default value passed to
// createContext matches the shape that the consumers expect!
export const CartContext = React.createContext<{items:matress[],addItem:(item:matress)=>void}>({
  items: [],
  addItem: () => { }
});
CartContext.displayName = 'CartContext'



const CartContextProvider : React.FC = ({children}) => {
  const [items, setItems] = useState<matress[]>([])
  function addItem(newItem: matress) {
    setItems([...items, newItem])
  }
  return (
    <CartContext.Provider value={{ items, addItem }}>
      {children}
    </CartContext.Provider>
  )
}


const useCartContext = () => useContext(CartContext)

export {
  CartContextProvider,
  useCartContext
}
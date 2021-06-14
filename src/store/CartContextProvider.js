import { useReducer } from 'react';

import CartContext from './cart-context';

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === 'ADD') {

    let updatedItem
    let updatedItems

    const existingItemIndex = state.items.findIndex(item => item.id === action.item.id)
    const exitingItem = state.items[existingItemIndex];
    if (exitingItem) {

        updatedItems = [...state.items];
        
        updatedItem = {
            ...exitingItem,
            amount:action.item.amount+exitingItem.amount
        }
        updatedItems[existingItemIndex] = updatedItem;

    }else{
        updatedItems = state.items.concat(action.item);
    }
    
    const updatedTotalAmount = +state.totalAmount + action.item.price * action.item.amount;
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === 'REMOVE') {

    let updatedItem
    let updatedItems

    const existingItemIndex = state.items.findIndex(item => item.id === action.id)
    const exitingItem = state.items[existingItemIndex];
    const updatedCount = --exitingItem.amount
    
    if(updatedCount === 0){
        updatedItems = state.items.filter(item => {
            return item.id !== action.id;
        })
    }
    if (exitingItem && updatedCount > 0) {
        updatedItems = [...state.items];
        updatedItem = {
            ...exitingItem,
            amount:updatedCount
        }
        updatedItems[existingItemIndex] = updatedItem;

    }
    const updatedTotalAmount = +state.totalAmount - exitingItem.price;
    return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };

  }
  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

  const addItemToCartHandler = (item) => {
    dispatchCartAction({type: 'ADD', item: item});
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({type: 'REMOVE', id: id});
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;

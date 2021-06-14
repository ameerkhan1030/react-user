import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import React, { useContext } from "react";

import CartItem from "./CartItem";

const Cart = props => {
  const cartCtx = useContext(CartContext);

  const addHandler = (item) => {
    cartCtx.addItem(item);
  }

  const removeHandler = (id) => {
    cartCtx.removeItem(id)
}

  const totalAmount = `₹${cartCtx.totalAmount.toFixed(2)}`; // this will prepend $ in totalAmount
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map(meal => (
        <CartItem
          key={meal.id}
          name={meal.name}
          price={meal.price}
          description={meal.description}
          amount={meal.amount}
          onAdd={addHandler.bind(null,meal)}
          onRemove={removeHandler.bind(null,meal.id)}
        ></CartItem>
      ))}
    </ul>
  );

  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onClose}>
          Close
        </button>
        <button className={classes.button}>Order</button>
      </div>
    </Modal>
  );
};

export default React.memo(Cart);

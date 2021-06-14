import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import CartContext from '../../store/cart-context'
import React,{useContext} from 'react'
const MealItem = props => {

    const cartCtx = useContext(CartContext);
    const addToCartHandler = (amount) => {
        cartCtx.addItem({
            amount:amount,
            id:props.id,
            price:props.price,
            description:props.description,
            name:props.name
        })
    }
  return (
    <div className={classes.meal}>
      <h3>{props.name}</h3>
      <div className={classes.description}>{props.description}</div>
      <div className={classes.price}>{props.price}</div>
      <div>
          <MealItemForm addToCart={addToCartHandler} id={props.id}/>
      </div>
    </div>
  );
};

export default MealItem;

import classes from "./MealItemForm.module.css";
import Input from "../UI/Input";
import { useState, useRef } from "react";
const MealItemForm = props => {
  const [amountIsValid, setAmountIsValid] = useState(false);
  const amountRef = useRef();

  const amountHandler = event => {
    event.preventDefault();

    const enteredAmount = amountRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setAmountIsValid(false);
      return;
    }
    props.addToCart(enteredAmountNumber);
  };

  return (
    <form className={classes.form} onSubmit={amountHandler}>
      <Input
        ref={amountRef}
        label="Amount"
        input={{
          id: "amount " + props.id,
          type: "number",
          min: "0",
          max: "5",
          step: "1",
          defaultValue: "0"
        }}
      />
      <button>+ Add</button>
      {amountIsValid && <p>Amount should be 1 to 5</p>}
    </form>
  );
};

export default MealItemForm;

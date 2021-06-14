import Header from "../components/Layout/Header";
import Meals from "../components/Meals/Meals";
import Cart from "../components/Cart/Cart";
import React, { Fragment, useState } from "react";
import { useHistory } from "react-router-dom";
const FoodOrder = () => {
  const [cartIsShown, setCartIsShown] = useState(false);
  const history = useHistory();

  const showHandler = () => {
    setCartIsShown(true);
  };
  const hideHandler = () => {
    setCartIsShown(false);
  };


  if (localStorage.getItem("x-authorization") === null) {
      history.push('/v1/login')
  }

  return (
    <Fragment>
      {cartIsShown && <Cart onClose={hideHandler} />}
      <Header onCartShow={showHandler} />
      <main>
        <Meals />
      </main>
    </Fragment>
  );
};

export default FoodOrder;

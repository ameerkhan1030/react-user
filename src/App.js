import { Route, Redirect, Switch } from "react-router-dom";

import CartContextProvider from "./store/CartContextProvider";

import FoodOrder from "./pages/FoodOrder";
import Login from "./pages/Login";

function App() {
  return (
    <Switch>
      <Route path="/v1/food-order">
        <CartContextProvider>
          <FoodOrder />
        </CartContextProvider>
      </Route>
      <Route path="/v1/:login">
        <Login />
      </Route>
    </Switch>
  );
}

export default App;

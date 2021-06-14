import classes from "./AvailableMeals.module.css";
import React, { useEffect, useState } from "react";
import MealItem from "./MealItem";
import Card from "../UI/Card";

// const DUMMY_MEALS = [
//   {
//     id: "m1",
//     name: "Sushi",
//     description: "Finest fish and veggies",
//     price: 22.99
//   },
//   {
//     id: "m2",
//     name: "Schnitzel",
//     description: "A german specialty!",
//     price: 16.5
//   },
//   {
//     id: "m3",
//     name: "Barbecue Burger",
//     description: "American, raw, meaty",
//     price: 12.99
//   },
//   {
//     id: "m4",
//     name: "Green Bowl",
//     description: "Healthy...and green...",
//     price: 18.99
//   }
// ];

const AvailableMeals = props => {
  const [httpError, setHttpError] = new useState();
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://test-84dff-default-rtdb.firebaseio.com/meals.json"
      );
      if(!response.ok){
        throw new Error("Something Error")
      }
      const reponseData = await response.json();

      const transformedData = [];

      for (const key in reponseData) {
        transformedData.push({
          id: key,
          name: reponseData[key].name,
          price: reponseData[key].price,
          description: reponseData[key].description
        });
      }
      setMeals(transformedData);
    };
    fetchMeals().catch(error => {
      setHttpError(error.message)
    });
  }, [setHttpError]);

  if (httpError) {
    return (
      <section className={classes['meals-error']}>
        <p>{httpError}</p>
      </section>
    );
  }
  const mealsList = meals.map(meal => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    ></MealItem>
  ));
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;

import { Link, useParams, useHistory } from "react-router-dom";
import { useRef } from "react";
import Input from "../components/UI/Input";
import classes from "./Login.module.css";

import Card from '../components/UI/Card'

const Login = () => {
  const emailRef = useRef();
  const nameRef = useRef("");
  const passwordRef = useRef();
  const params = useParams();
  const history = useHistory();
  let isLogin = false;

  if (params.login === "login") {
    isLogin = true;
  }
  const saveUser = async user => {
    const reponse = await fetch(
      "https://test-84dff-default-rtdb.firebaseio.com/users.json",
      {
        method: "POST",
        body: JSON.stringify(user)
      }
    );
    if (!reponse.ok) {
      throw new Error("Something Internal Error");
    }
  };

  const loginValidation = async (email, password) => {
    const reponse = await fetch(
      "https://test-84dff-default-rtdb.firebaseio.com/users.json"
    );
    const reponseData = await reponse.json();

    const loadedData = [];

    for (const key in reponseData) {
      loadedData.push(reponseData[key]);
    }
    const loadedArray = [];
    for (const key in loadedData) {
      loadedArray.push({
        email: loadedData[key].email,
        password: loadedData[key].password
      });
    }

    const user = loadedArray.filter(user => {
      return user.email === email;
    });

    if (user[0].email === email && user[0].password === password) {
      console.log("Login Success");
      localStorage.setItem("x-authorization", email);
      history.push("/v1/food-order");
    }
  };
  const formHandler = event => {
    event.preventDefault();
    const user = {
      email: emailRef.current.value,
      password: passwordRef.current.value
    };
    if (!isLogin) {
      saveUser(user).catch(error => {
        console.log(error.message);
      });
      history.push("/v1/login");
    } else {
      loginValidation(emailRef.current.value, passwordRef.current.value);
    }
    emailRef.current.value = "";
    passwordRef.current.value = "";
  };

  return (
    <Card className={classes.section}>
      <form onSubmit={formHandler}>
        {isLogin ? <h3>Login Form</h3> : <h3>Registration Form</h3>}
        {isLogin === false && (
          <Input
            ref={nameRef}
            label="Name"
            input={{ key: "name", type: "text", id: "name" }}
          />
        )}
        <Input
          ref={emailRef}
          label="Email"
          input={{ key: "login", type: "text", id: "login" }}
        />
        <Input
          ref={passwordRef}
          label="Password"
          input={{ key: "pwd", type: "password", id: "pwd" }}
        />
        <button type="Submit">Submit</button>
        <div>
          {isLogin ? (
            <Link to="/v1/registration">To Register</Link>
          ) : (
            <Link to="/v1/login">To Login</Link>
          )}
        </div>
      </form>
    </Card>
  );
};

export default Login;

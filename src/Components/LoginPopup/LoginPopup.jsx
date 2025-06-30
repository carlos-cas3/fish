import React, { useContext, useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const LoginPopup = ({setShowLogin}) => {
  /*agregamos la url del backend*/
  const {url,setToken} = useContext(StoreContext);
  //agregamos el estado de currState y inicializamos en Login
  const [currState, setCurrState] = useState("Login");
  //agregamos el estado de data y inicializamos en un objeto vacio
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });

  //agregamos la funcion onChangeHandler que recibe un evento y actualiza el estado de data
  const onChangeHandler = (event) => { 
      const name = event.target.name;
      const value = event.target.value;
      setData(data => ({...data, [name]: value}));
  }

  //agregamos la funcion onLogin que recibe un evento y hace una peticion al backend para loguear al usuario
  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl = url;
    if(currState === "Login"){
      newUrl += "/api/user/login";
    }else{
      newUrl += "/api/user/register";
    }
    const response = await axios.post(newUrl, data);
    if(response.data.success){
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      setShowLogin(false);
    }else{
      alert(response.data.message);
    }
}






  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="login-popup-inputs">
          {currState === "Login" ? (
            <></>
          ) : (
            <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder="your name" required />
          )}
          <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder="your email" required />
          <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder="Password" required />
        </div>
        <button type='submit'>{currState == "Sign up" ? "Create account" : "Login"}</button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing. i agree to the terms of use & privacy policy </p>
        </div>
        {currState === "Login" ? (
          <p>
            Create a new account?
            <span onClick={() => setCurrState("Sign up")}> Click here</span>
          </p>
        ) : (
          <p>
            Already have an account?
            <span onClick={() => setCurrState("Login")}> Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;

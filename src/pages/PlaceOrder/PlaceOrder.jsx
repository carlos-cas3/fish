import React, { useContext, useEffect, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } =
    useContext(StoreContext);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value })); //actualizamos el estado
  };

  //Creamos un placeOrder para enviar la orden al backend
 const placeOrder = async (event) => {
   event.preventDefault();
   console.log("Token:", token); //// Para verificar que el token no sea undefined o null
   let orderItems = [];
   food_list.map((item) => {
     if (cartItems[item._id] > 0) {
       let itemInfo = item;
       itemInfo["quantity"] = cartItems[item._id];
       orderItems.push(itemInfo);
     }
   });
   let orderData = {
     address: data,
     items: orderItems,
     amount: getTotalCartAmount() + 2,
   };
   console.log("Order Data:", orderData); //// Para verificar que los datos están bien estructurados

   try {
     let response = await axios.post(`${url}/api/order/place`, orderData, {
       headers: { token },
     });

     console.log("Response Data:", response.data); // Para verificar la respuesta del backend

     if (response.data.success) {
       const { session_url } = response.data;
       window.location.replace(session_url);
     } else {
       alert("Error al procesar el pago.");
     }
   } catch (error) {
     console.error("Error en la petición:", error); // Muestra el error en la consola
     alert("Hubo un problema al procesar la orden. Revisa la consola.");
   }
 };
 const navigate= useNavigate();
  // Importa useNavigate desde react-router-dom

 useEffect(()=>{
  if(!token){

    navigate("/cart");



  }
  else if(getTotalCartAmount()===0){
    navigate("/cart");

  }


 },[token])

  return (
    /*Campos para el pedido*/
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          {/*Campos para el nombre y apellido onchange para actualizar el estado*/}
          <input
            required
            name="firstName"
            onChange={onChangeHandler}
            value={data.firstName}
            type="text"
            placeholder="First Name"
          />
          <input
            required
            name="lastName"
            onChange={onChangeHandler}
            value={data.lastName}
            type="text"
            placeholder="Last Name"
          />
        </div>
        <input
          required
          name="email"
          onChange={onChangeHandler}
          value={data.email}
          type="email"
          placeholder="Email address"
        />
        <input
          required
          name="street"
          onChange={onChangeHandler}
          value={data.street}
          type="text"
          placeholder="Street"
        />
        <div className="multi-fields">
          <input
            required
            name="city"
            onChange={onChangeHandler}
            value={data.city}
            type="text"
            placeholder="City"
          />
          <input
            required
            name="state"
            onChange={onChangeHandler}
            value={data.state}
            type="text"
            placeholder="State"
          />
        </div>
        <div className="multi-fields">
          <input
            required
            name="zipCode"
            onChange={onChangeHandler}
            value={data.zipCode}
            type="text"
            placeholder="Zip Code"
          />
          <input
            required
            name="country"
            onChange={onChangeHandler}
            value={data.country}
            type="text"
            placeholder="Country"
          />
        </div>
        <input
          required
          name="phone"
          onChange={onChangeHandler}
          value={data.phone}
          type="text"
          placeholder="Phone"
        />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Free</p>
              <p>S/.{getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>
                S/.{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
              </b>
            </div>
          </div>
          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;

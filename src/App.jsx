import React, { useState } from "react";
import Navabar from "./Components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Footer from "./Components/Footer/Footer";
import LoginPopup from "./Components/LoginPopup/LoginPopup";
import Verify from "./pages/Verify/Verify";
import MyOrders from "./pages/MyOrders/MyOrders";

const App = () => {
  const[showLogin,setShowLogin]=useState(false)
  

  return (
    <>
    {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
    
      <div className="app">
        <Navabar setShowLogin={setShowLogin}/>
        <Routes>
          {/* Creamos una ruta con el path / y el componente Home */}
          <Route path="/" element={<Home />} />
          {/* Creamos una ruta con el path /cart y el componente Cart */}
          <Route path="/cart" element={<Cart />} />
          {/* Creamos una ruta con el path /placeorder y el componente PlaceOrder */}
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/myorders" element={<MyOrders/>} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;

import React, { useContext, useState } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const {
    cartItems,
    food_list,
    removeFromCart,
    getTotalCartAmount,
    url,
  } = useContext(StoreContext);

  const navigate = useNavigate();

  /* ───────────────── Promo‑code state ───────────────── */
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);          // 0→ sin descuento
  const [msg, setMsg] = useState("");                   // feedback al usuario

  const handleApplyPromo = () => {
    // Ejemplo estático. Cambia a petición al backend si lo deseas.
    if (promoCode.trim().toUpperCase() === "JULIA20") {
      setDiscount(0.2);                // 20 %
      setMsg("¡Código válido! 20 % aplicado.");
    } else {
      setDiscount(0);
      setMsg("Código inválido.");
    }
  };

  /* ───────────────── Totales ───────────────── */
  const subtotal = getTotalCartAmount();
  const discountAmount = subtotal * discount;
  const deliveryFee = subtotal === 0 ? 0 : 2;
  const grandTotal = subtotal - discountAmount + deliveryFee;

  return (
    <div className="cart">
      {/* ───────── Items en carrito ───────── */}
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Título</p>
          <p>Precio</p>
          <p>Cantidad</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item) =>
          cartItems[item._id] > 0 ? (
            <div className="cart-items-title cart-items-item" key={item._id}>
              <img src={url + "/images/" + item.image} alt="" />
              <p>{item.name}</p>
              <p>S/.{item.price}</p>
              <p>{cartItems[item._id]}</p>
              <p>S/.{cartItems[item._id] * item.price}</p>
              <button onClick={() => removeFromCart(item._id)}>Remove</button>
            </div>
          ) : null
        )}
      </div>

      {/* ───────── Totales + PromoCode ───────── */}
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>S/.{subtotal.toFixed(2)}</p>
            </div>
            {discount > 0 && (
              <>
                <hr />
                <div className="cart-total-details">
                  <p>Descuento (–{(discount * 100).toFixed(0)}%)</p>
                  <p>–S/.{discountAmount.toFixed(2)}</p>
                </div>
              </>
            )}
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>S/.{deliveryFee.toFixed(2)}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>S/.{grandTotal.toFixed(2)}</b>
            </div>
          </div>
          <button onClick={() => navigate("/order")}>
            PROCEED TO CHECKOUT
          </button>
        </div>

        {/* Promo‑code form */}
        <div className="cart-promocode">
          <div>
            <p>Si tienes un código de promoción, ingrésalo aquí</p>
            <div className="cart-promocode-input">
              <input
                type="text"
                placeholder="Enter Code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
              />
              <button onClick={handleApplyPromo}>Apply</button>
            </div>
            {msg && <span className="cart-promocode-msg">{msg}</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

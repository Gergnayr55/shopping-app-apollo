import React, { ReactElement, SyntheticEvent } from "react";
import "./Cart.css";
import CartIcon from "../../icons/cart.png";
interface CartProps {
  onClick: () => SyntheticEvent;
}
function Cart({ onClick }: CartProps): ReactElement {
  return (
    <img onClick={onClick} className="cart-icon" src={CartIcon} alt="cart" />
  );
}
export default Cart;

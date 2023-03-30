import React, { ReactElement, SyntheticEvent } from "react";
import "./MenuIcon.css";
export type MenuIconProps = {
  isOpen: boolean;
  onClick: () => SyntheticEvent;
};
function MenuIcon({ isOpen, onClick }: MenuIconProps): ReactElement {
  return (
    <div className={`menu-icon ${isOpen ? "open" : ""}`} onClick={onClick}>
      <div className={`${isOpen ? "change " : ""}bar1`}></div>
      <div className={`${isOpen ? "change " : ""}bar2`}></div>
      <div className={`${isOpen ? "change " : ""}bar3`}></div>
    </div>
  );
}
export default MenuIcon;

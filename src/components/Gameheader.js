// Ali_Mongi-L2T12-CapstoneProject-REACT
// @GAMEHEADER.js
import React from "react";
import logo from "../images/header/logo.png";
import { Container, Image } from "react-bootstrap";

/* return the game's name*/
const Gameheader = (props) => {
  return (
    <div>
      <div className="logoArea">
        <Image src={logo} alt="logo" className="logo" />
      </div>
      <div className="header">
        <h1>{props.gameName}</h1>
      </div>
    </div>
  );
};

export default Gameheader;

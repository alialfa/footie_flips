// Ali_Mongi-L2T12-CapstoneProject-REACT
// @GAMECARD.js
import React from "react";
import { Card, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

// generates a unique card, that is clickable and contains an image
const Gamecard = (props) => {
  return (
    <div>
      <Card
        className="gamecard"
        id={props.id}
        as={Link}
        onClick={(e) => {
          props.isFlipped == false && props.clicks < 3
            ? props.handleClick(e, props.id)
            : e.preventDefault();
        }}
      >
        <Container>
          <Card.Img
            variant="top"
            src={require(`../images/cardimg/${props.cardUrl}`)}
            className="cardImage"
          />
        </Container>
      </Card>
    </div>
  );
};

export default Gamecard;

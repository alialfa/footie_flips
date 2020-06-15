// Ali_Mongi-L2T12-CapstoneProject-REACT
// @GAMEDAHBOARD.js
import React, { Component } from "react";
import Gamecard from "../components/Gamecard";
import ReactCardFlip from "react-card-flip"; // this is an ext module for animating card flips
import { Row } from "react-bootstrap";

//
class Gameboard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // iterate via a map to prep render for complete game board of 16 cards
    // 8 front cards + 8 back cards
    const getGameCard = this.props.cardDeck.map((card, index) => {
      /*
        // React Card Flip Functionality
        <FRONT_CCOMPONENT>
        This is the front of the card.
        <button onClick={this.handleClick}>Click to flip</button>
        </YOUR_FRONT_CCOMPONENT>

        <BACK_COMPONENT>
        This is the back of the card.
        <button onClick={this.handleClick}>Click to flip</button>
        </YOUR_BACK_COMPONENT>
        */
      return (
        <div>
          <ReactCardFlip isFlipped={card.isFlipped} flipDirection="vertical">
            <Gamecard
              id={index}
              cardUrl="card_front.jpg"
              isFlipped={card.isFlipped}
              clicks={this.props.clicks}
              handleClick={this.props.handleClick}
            ></Gamecard>
            <Gamecard
              id={index}
              cardUrl={card.url}
              cardTeam={card.team}
              handleClick={this.props.handleClick}
            />
          </ReactCardFlip>
        </div>
      );
    });

    // return full game board deck
    return (
      <div className="board">
        <Row>{getGameCard}</Row>
      </div>
    );
  }
}

export default Gameboard;

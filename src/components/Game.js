// Ali_Mongi-L2T12-CapstoneProject-REACT
// @GAME.js
import React, { Component } from "react";
import Gameheader from "../components/Gameheader";
import Gamedashboard from "../components/Gamedashboard";
import Gameboard from "../components/Gameboard";

let matchCounter = 0; // track card matches

class Game extends Component {
  constructor(props) {
    super(props);

    // initial state of cards array, holding team names and their image urls
    // additional in-game variables initialized here
    this.state = {
      cardDeck: [
        { team: "JUVENTUS", isFlipped: false, url: "juventus.jpg" },
        { team: "ARSENAL", isFlipped: false, url: "arsenal.jpg" },
        { team: "MADRID", isFlipped: false, url: "madrid.jpg" },
        { team: "CHELSEA", isFlipped: false, url: "chelsea.jpg" },
        { team: "BARCELONA", isFlipped: false, url: "barcelona1.jpg" },
        { team: "SWANSEA", isFlipped: false, url: "swansea.jpg" },
        { team: "MCITY", isFlipped: false, url: "mcity.jpg" },
        { team: "LIVERPOOL", isFlipped: false, url: "liverpool1.jpg" },
        { team: "JUVENTUS", isFlipped: false, url: "juventus.jpg" },
        { team: "ARSENAL", isFlipped: false, url: "arsenal.jpg" },
        { team: "MADRID", isFlipped: false, url: "madrid.jpg" },
        { team: "CHELSEA", isFlipped: false, url: "chelsea.jpg" },
        { team: "BARCELONA", isFlipped: false, url: "barcelona1.jpg" },
        { team: "SWANSEA", isFlipped: false, url: "swansea.jpg" },
        { team: "MCITY", isFlipped: false, url: "mcity.jpg" },
        { team: "LIVERPOOL", isFlipped: false, url: "liverpool1.jpg" },
      ],
      gameStatus: "//READY",
      gameScore: 0,
      gameTime: 0,
      clicks: 1,
      firstCardClicked: "",
      secondCardClicked: "",
      firstCardClickedIndex: "",
    };

    // shuffle the card array
    shuffleDeck(this.state.cardDeck);
    //const arr = <Gameload cardDeckArray={this.state.cardDeck} />;

    // context binding of functions
    this.timeout = 0;
    this.handleClick = this.handleClick.bind(this);
    this.handleRestart = this.handleRestart.bind(this);
    this.flipTheCard = this.flipTheCard.bind(this);
  }

  /* when a card is clicked, 
  only a max of 2 cards are clickable at any moment */
  handleClick = (e, clickedCardID) => {
    // load game, increment click counter
    this.setState({
      gameStatus: "//IN PLAY",
      clicks: this.state.clicks + 1,
    });

    // 1st card clicked
    if (this.state.clicks == 1) {
      this.state.firstCardClicked = this.state.cardDeck[clickedCardID].team;
      this.state.firstCardClickedIndex = clickedCardID;

      this.flipTheCard(clickedCardID, true); // flip the first card onClick to reveal
    }

    // 2nd card clicked
    if (this.state.clicks == 2) {
      this.state.secondCardClicked = this.state.cardDeck[clickedCardID].team;

      const card1 = this.state.firstCardClicked;
      const card1index = this.state.firstCardClickedIndex;
      const card2 = this.state.secondCardClicked;

      this.flipTheCard(clickedCardID, true); // flip the 2nd card onClick to reveal

      // if 1st and 2nd card match
      if (card1 == card2) {
        this.setState({ gameScore: this.state.gameScore + 1, clicks: 1 }); // update score, allow more card clicks, reset clicks

        matchCounter += 1;
        // 8 pairs matched, the game was won
        if (matchCounter == "8") {
          this.setState({
            gameStatus: "//YOU WON!!!",
            gameTime: this.state.gameTime,
          });
          //alert("Congratulations! Footie Flipper, YOU DID IT :)");
        }
      }
      // if 1st and 2nd card DONT match
      else {
        this.flipTheCard(clickedCardID, true); // animate to reveal 2nd card

        // delay function is vital for user experience
        // here we return the cards to original states
        if (this.timeout) clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          this.flipTheCard(card1index, false); // reverse flip 1st card
          this.flipTheCard(clickedCardID, false); // reverse flip 2nd card
          this.setState({
            clicks: 1,
            firstCardClicked: "",
            secondCardClicked: "",
            firstCardClickedIndex: "",
          });
        }, 700);
      }
    }
  };

  /* when the game is restarted */
  handleRestart(e) {
    e.preventDefault();

    let restartID = e.target.id;
    this.flipTheCard(restartID, false); // restart allows all the cards to be reverse flipped
    shuffleDeck(this.state.cardDeck); // reshuffle the deck

    this.setState({
      gameStatus: "//READY",
      gameScore: 0,
      gameTime: 0,
      clicks: 1,
    });
    matchCounter = 0;
  }

  flipTheCard = (cardID, flipBool) => {
    // reverse flip a specific card, false if unflipped
    this.setState((prevState) => ({
      cardDeck: prevState.cardDeck.map((card, cIndex) =>
        cardID == cIndex ? Object.assign(card, { isFlipped: flipBool }) : card
      ),
    }));

    // game restart, reset all cards
    if (cardID == "restartBtn") {
      this.setState((prevState) => ({
        cardDeck: prevState.cardDeck.map((card) =>
          Object.assign(card, { isFlipped: false })
        ),
      }));
    }
  };

  tick() {
    // when the 1st card is flipped, the timer begins
    if (this.state.gameStatus == "//IN PLAY")
      this.setState((state) => ({
        gameTime: state.gameTime + 1,
      }));
  }
  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div className="game">
        <Gameheader gameName="FOOTIE FLIPS" />
        <Gamedashboard
          gameStatus={this.state.gameStatus}
          gameScore={this.state.gameScore}
          gameTime={this.state.gameTime}
          handleRestart={this.handleRestart}
        />
        <Gameboard
          cardDeck={this.state.cardDeck}
          gameStatus={this.state.gameStatus}
          gameScore={this.state.gameScore}
          clicks={this.state.clicks}
          handleClick={this.handleClick}
        />
      </div>
    );
  }
}

/* randomizer function that swaps array positions */
function shuffleDeck(cardDeckArray) {
  let i = cardDeckArray.length - 1;
  for (; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = cardDeckArray[i];
    cardDeckArray[i] = cardDeckArray[j];
    cardDeckArray[j] = temp;
  }
  return cardDeckArray;
}

export default Game;

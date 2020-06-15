// Ali_Mongi-L2T12-CapstoneProject-REACT
// @GAMEDASHBOARD.js
import React from "react";
import { Container, Button, OverlayTrigger, Tooltip } from "react-bootstrap";

/* responsible for > dashboard showing in-game state changes
                   > controls with menu buttons within the game */
const Gamedashboard = (props) => {
  return (
    <div>
      <div className="dashboard">
        <Container>
          <h3 style={{ color: "rgb(40, 106, 182)" }}>
            <b>DASHBOARD</b>
          </h3>
          <hr></hr>
          <h4>
            STATUS: <h5>{props.gameStatus}</h5>
          </h4>
          <hr></hr>
          <h4>
            SCORE:<h5>{props.gameScore}</h5>
          </h4>
          <hr></hr>
          <h4>
            TIME:<h5>{props.gameTime}</h5>
          </h4>
          <hr></hr>
        </Container>
      </div>

      <div className="controls">
        <Container>
          <h3 style={{ color: "rgb(40, 106, 182)" }}>
            <b>CONTROLS</b>
          </h3>
          <hr></hr>
          <Button id="restartBtn" onClick={props.handleRestart}>
            RESTART
          </Button>
          <hr></hr>
          <Gamerules />
        </Container>
      </div>
    </div>
  );
};

/* custom bootstrap button that shows help instructions on hover, uses a tooltip */
const Gamerules = () => (
  <OverlayTrigger
    placement="bottom"
    delay={{ show: 250, hide: 400 }}
    overlay={renderTooltip}
  >
    <Button>FLIPPER MANUAL</Button>
  </OverlayTrigger>
);

function renderTooltip(props) {
  return (
    <Tooltip id="button-tooltip" {...props}>
      <h5>`BE A FLIPPER`</h5>
      <h6>General:</h6>
      <ul>
        <li>A Memory Game</li>
        <li>Game starts on first flip</li>
        <li> Card reveals an image </li>
        <li>Better your time!</li>
      </ul>
      <h6>Instructions:</h6>
      <ul>
        <li>Flip all cards</li>
        <li>Matched pair = 1pt</li>
        <li> Max Score = 8pts</li>
        <li>Restart for deck shuffle</li>
      </ul>
    </Tooltip>
  );
}

Gamedashboard.propTypes = {};

export default Gamedashboard;

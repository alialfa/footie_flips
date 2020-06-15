import React, { Component } from "react";
import "./App.css";
import Game from "./components/Game";
import { BrowserRouter as Router, Route } from "react-router-dom";
//import { Container } from "react-bootstrap/Container";

function App() {
  return (
    <div className="App">
      <Router>
        <Game />
      </Router>
    </div>
  );
}

export default App;

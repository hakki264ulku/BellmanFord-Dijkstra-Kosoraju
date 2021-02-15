import './App.css';
import tw from 'twin.macro'
import React, { useEffect, useState } from 'react';
import { Graph } from "react-d3-graph";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import TopContainer from './TopContainer'
import BellmanFord from './AlgorithmSpecificPages/BellmanFord'
import Dijkstra from './AlgorithmSpecificPages/Dijkstra'
import Kosaraju from './AlgorithmSpecificPages/Kosaraju'
import NavBar from './NavBar'
import { Graphh, produceGraphVisualisation } from './utils/BellmanFordAlgorithm.js'

function App() {


  return (
    <Router>
      <TopContainer />
      <NavBar />
      <Switch>
        <Route exact path="/BellmanFord">
          <BellmanFord />
        </Route>
        <Route exact path="/Dijkstra">
          <Dijkstra />
        </Route>
        <Route exact path="/Kosaraju">
          <Kosaraju />
        </Route>
      </Switch>
    
    
    </Router>
  );
}












const Container = tw.div`bg-gray-200 w-screen h-screen`

export default App;

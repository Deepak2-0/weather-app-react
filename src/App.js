import './App.css';
import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import NotFoundPage from "./components/NotFoundPage";
import Home from "./components/Home";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route  component={NotFoundPage} />
      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;

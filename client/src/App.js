import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/Home/Home";
import LandingPage from "./components/Landing/Landing"
import DogCreate from "./components/DogCreate/DogCreate"
import Detail from "./components/Detail/Detail";
import PageError from "./components/PageError/PageError"

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={ LandingPage } />
          <Route exact path="/home" component={ Home } />
          <Route path="/dog" component={ DogCreate} />
          <Route path="/dogs/:id" component={ Detail } /> 
          <Route path='*' component={ PageError } />
          <Route path="/home/* "component={ PageError } />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;

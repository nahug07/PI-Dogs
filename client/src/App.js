import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import LandingPage from "./components/Landing/Landing"

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          {/* <Route path="/character" element={<CharacterCreate />} /> */}
          {/* <Route path="/home/:id" element={<Detail />} /> */}
          {/* <Route path='/home/*' element={ <PageError/> } /> */}
          {/* <Route path='*' element={ <PageError/> } /> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

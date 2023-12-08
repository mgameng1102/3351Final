import React, { useState, useEffect } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./components/Pages/Home";
import { Pets } from "./components/Pages/Pets";
import { Questionnaire } from "./components/Pages/Questionnaire";
import { Results } from "./components/Pages/Results";
import { Feedback } from "./components/Pages/Feedback";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/message")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);

  return (
    <>
      <Router>
        <NavBar />
        <div className="App">
          {/* <h1>{message}</h1> */}
        </div>

        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pets" element={<Pets />} />
            <Route path="/questionnaire" element={<Questionnaire />} />
            <Route path="/results" element={<Results />} />
            <Route path="/feedback" element={<Feedback />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;

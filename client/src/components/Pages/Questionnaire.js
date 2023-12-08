import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "./Questionnaire.css";

export const Questionnaire = () => {
  const [questions, setQuestions] = useState({});
  const [selectedValues, setSelectedValues] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Fetching questions...');
    // Fetch questions data from the server when the component mounts
    fetch("http://localhost:8000/questions")
      .then((response) => response.json())
      .then((data) => {
        console.log('Questions received:', data);
        setQuestions(data);

        // Initialize selectedValues state with default values
        const initialSelectedValues = {};
        Object.entries(data).forEach(([category, questionSet]) => {
          Object.keys(questionSet).forEach((questionId) => {
            initialSelectedValues[questionId] = 1; // Default value is 1
          });
        });
        setSelectedValues(initialSelectedValues);
      })
      .catch((error) => {
        console.error('Error fetching questions:', error);
      });
  }, []);



  const handleSelectChange = (questionId, value) => {
    setSelectedValues((prevValues) => ({
      ...prevValues,
      [questionId]: value,
    }));
  };

  const handleSubmit = () => {
    const userAnswers = {
      lifestyle: [selectedValues[1], selectedValues[2], selectedValues[3], selectedValues[4], selectedValues[5]],
      livingConditions: [selectedValues[6], selectedValues[7], selectedValues[8], selectedValues[9], selectedValues[10]],
      careCapabilities: [selectedValues[11], selectedValues[12], selectedValues[13], selectedValues[14], selectedValues[15]]
    };

    // Convert all values within each array to strings
    const stringifiedUserAnswers = Object.fromEntries(
      Object.entries(userAnswers).map(([key, values]) => [key, values.map(value => String(value))])
    );

    // Convert the object to a JSON string
    const jsonString = JSON.stringify(stringifiedUserAnswers);
    
    // Make a POST request to the server
    fetch("http://localhost:8000/answer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonString,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Server response:", data);
        navigate("/results", { state: { recommendedPets: data.recommendedPets } });
      })
      .catch((error) => {
        console.error("Error sending answers:", error);
      });
    console.log(selectedValues);
    console.log(userAnswers);
  };

  function renderQuestions() {
    if (!questions) return null;

    return Object.entries(questions).map(([category, questionSet]) => (
      <div key={category} className="question-category">
        <h2>{category}</h2>
        <ul className="question-list">
          {Object.entries(questionSet).map(([questionId, questionText]) => (
            <li key={questionId} className="question-item">
              <span className="question-text">{questionText}</span>
              <select
                className="answer-dropdown"
                value={selectedValues[questionId]}
                onChange={(e) => handleSelectChange(questionId, e.target.value)}
              >
                {[1, 2, 3, 4, 5].map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </li>
          ))}
        </ul>
      </div>
    ));
  }

  return (
    <div className="questionnaire-container">
      <h1>Questionnaire</h1>
      {renderQuestions()}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};




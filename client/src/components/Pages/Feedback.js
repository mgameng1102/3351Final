import React, { useState } from "react";
import axios from "axios";
import "./Feedback.css"; // Import your CSS file

export const Feedback = () => {
  const [feedbackData, setFeedbackData] = useState({
    question1: "",
    question2: "",
    rating: 3,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFeedbackData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSliderChange = (e) => {
    setFeedbackData((prevData) => ({
      ...prevData,
      rating: parseInt(e.target.value, 10),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8000/submit-feedback", feedbackData);
      alert("Feedback submitted successfully!");
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("Failed to submit feedback. Please try again.");
    }
  };

  return (
    <div className="feedback-container">
      <h1 className="feedback-title">Feedback</h1>
      <form className="feedback-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="question1">Likelihood to recommend:</label>
          <input
            type="text"
            id="question1"
            name="question1"
            value={feedbackData.question1}
            onChange={handleInputChange}
            required // Added required attribute
          />
        </div>
        <div className="form-group">
          <label htmlFor="question2">Suggestions:</label>
          <input
            type="text"
            id="question2"
            name="question2"
            value={feedbackData.question2}
            onChange={handleInputChange}
            required // Added required attribute
          />
        </div>
        <div className="form-group">
          <label htmlFor="rating">Rate your experience (out of 5):</label>
          <input
            type="range"
            id="rating"
            name="rating"
            min="1"
            max="5"
            value={feedbackData.rating}
            onChange={handleSliderChange}
            required // Added required attribute
          />
          <span className="rating-value">{feedbackData.rating}</span>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

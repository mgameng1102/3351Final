import React from "react";
import "./Home.css"; // Create a CSS file for styling if not already present
import dog from "../Assets/dog.jpg";

export const Home = () => {
  return (
    <div className="home-container">
      <div className="image-section">
        <img
          src={dog} // Replace with your image URL
          alt="Pet Recommendations"
          className="hero-image"
        />
      </div>
      <div className="content-section">
        <h1>Welcome to Pet Recommendations</h1>
        <p>
          Discover the perfect pet for you by answering a few simple questions.
          Our app provides personalized recommendations based on your preferences.
          Whether you're a cat lover, a dog enthusiast, or looking for a small
          companion like a hamster or a bird, we've got you covered.
        </p>
        <p>
          Explore our comprehensive database of various breeds and species, each
          with unique characteristics and traits. Make informed decisions about
          your future furry friend by learning about their temperament, exercise
          needs, and compatibility with your lifestyle.
        </p>
        <p>
          Get started now and embark on a delightful journey to find the
          four-legged (or two-winged) companion that will bring joy and
          companionship to your life.
        </p>
      </div>
    </div>
  );
};

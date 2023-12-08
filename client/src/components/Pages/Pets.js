// Pets.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Pets.css"; // Import the CSS file

export const Pets = () => {
  const [petData, setPetData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/get-pets")
      .then(response => {
        setPetData(response.data);
      })
      .catch(error => {
        console.error("Error fetching pet data:", error);
      });
  }, []);

  return (
    <div className="pet-container">
      {petData.map((pet) => (
        <div key={pet.name} className="pet-card">
          <img src={pet.photo} alt={pet.name} className="pet-photo" />
          <div className="pet-details">
            <h2>{pet.name}</h2>
            <div className="details-info">
              <p>Type: {pet.type}</p>
              <p>Breed: {pet.breed}</p>
              <p>Age: {pet.age}</p>
              <p>Gender: {pet.gender}</p>
              <p>State: {pet.state}</p>
            </div>
            <div className="details-description">
              <p>Description: {pet.description}</p>
              <p>Tags: {pet.tags.join(", ")}</p>
            </div>
            <a href={pet.url} target="_blank" rel="noopener noreferrer">
              More Info
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

import React from "react";
import { useLocation } from "react-router-dom";

export const Results = () => {
  const location = useLocation();
  const { recommendedPets } = location.state || {}; // Provide a default empty object  

  return (
    <div>
      <h1>Results</h1>
      
      {recommendedPets ? (
        <div className="pet-container">
        {recommendedPets.map((pet) => (
          <div key={pet.name} className="pet-card">
            <img src={pet.photos[0]?.full || ""} alt={pet.name} className="pet-photo" />
            <div className="pet-details">
              <h2>{pet.name}</h2>
              <div className="details-info">
                <p>Type: {pet.type}</p>
                <p>Breed: {pet.breeds.primary}</p>
                <p>Age: {pet.age}</p>
                <p>Gender: {pet.gender}</p>
                <p>State: {pet.contact.address.state}</p>
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
      ) : (
        <p>No recommended pets available.</p>
      )}
      {/* Add additional content as needed */}
    </div>
  );
};
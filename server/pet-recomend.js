const fs = require('fs');


function calculateUserSuitabilityScore(userAnswers) {

    // Question weights (adjust these based on importance)
    const lifestyleWeights = [0.1, 0.2, 0.15, 0.1, 0.05];
    const livingConditionsWeights = [0.2, 0.1, 0.15, 0.1, 0.15];
    const careCapabilitiesWeights = [0.15, 0.1, 0.2, 0.2, 0.15];
  
    // Normalize weights to ensure they sum up to 1
    const normalizeWeights = (weights) => {
      const sum = weights.reduce((acc, weight) => acc + weight, 0);
      return weights.map((weight) => weight / sum);
    };
  
    const normalizedLifestyleWeights = normalizeWeights(lifestyleWeights);
    const normalizedLivingConditionsWeights = normalizeWeights(livingConditionsWeights);
    const normalizedCareCapabilitiesWeights = normalizeWeights(careCapabilitiesWeights);
  
    // Calculate scores based on user answers
    const lifestyleScore = userAnswers.lifestyle.reduce((acc, answer, index) => acc + (answer/10) * normalizedLifestyleWeights[index], 0);
    const livingConditionsScore = userAnswers.livingConditions.reduce((acc, answer, index) => acc + (answer/10) * normalizedLivingConditionsWeights[index], 0);
    const careCapabilitiesScore = userAnswers.careCapabilities.reduce((acc, answer, index) => acc + (answer/10) * normalizedCareCapabilitiesWeights[index], 0);
  
    // Combine individual scores into an overall score
    const overallScore = (lifestyleScore + livingConditionsScore + careCapabilitiesScore) / 3;
  
    return overallScore;
}
  

function getRecommendedPets(userSuitabilityScore) {
    const fileContent = fs.readFileSync("pet-scores.json", 'utf8');
    const petScores = JSON.parse(fileContent);

    // Calculate the absolute difference between each pet's score and the user's score
    const differences = petScores.map((pet) => Math.abs(pet.score - userSuitabilityScore));

    // Create an array of objects with pet_id and corresponding difference
    const petDifferences = petScores.map((pet, index) => ({ pet_id: pet.pet_id, difference: differences[index] }));

    // Sort the array based on the difference in ascending order
    const sortedPetDifferences = petDifferences.sort((a, b) => a.difference - b.difference);

    // Take the top 5 closest pets
    const closestPets = sortedPetDifferences.slice(0, 5);
    const closestPetIds = closestPets.map((pet) => pet.pet_id);

    return closestPetIds;
}

// Example usage
const userAnswers = {
  lifestyle: [5, 4, 5, 3, 1], // Example answers for Lifestyle questions
  livingConditions: [5, 5, 5, 4, 5], // Example answers for Living Conditions questions
  careCapabilities: [4, 4, 5, 5, 5], // Example answers for Care Capabilities questions
};
  
const userSuitabilityScore = calculateUserSuitabilityScore(userAnswers);
const recommendedIDs = getRecommendedPets(userSuitabilityScore);
console.log(`The suitability score for the user is: ${userSuitabilityScore}`);
console.log("Top 5 closest pets:", recommendedIDs);
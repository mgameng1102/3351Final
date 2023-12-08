const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();

const petsData = require("./combined_animals.json");
const petScores = require("./pet-scores.json");


app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.post("/submit-feedback", (req, res) => {
  const feedbackData = req.body;

  let existingData = [];
  try {
    existingData = JSON.parse(fs.readFileSync("feedback.json", "utf-8"));
  } catch (error) {
    console.error("Error reading feedback.json:", error);
  }

  existingData.push(feedbackData);

  try {
    fs.writeFileSync("feedback.json", JSON.stringify(existingData, null, 2));
    console.log("Feedback data written to feedback.json");
    res.status(200).send("Feedback submitted successfully");
  } catch (error) {
    console.error("Error writing to feedback.json:", error);
    res.status(500).send("Internal Server Error");
  }
});


app.get("/get-pets", (req, res) => {
  // Extract the required information from the JSON data
  const formattedPets = petsData.map((pet) => ({
    photo: pet.photos[0]?.full || "",
    name: pet.name,
    type: pet.type,
    breed: pet.breeds.primary,
    age: pet.age,
    gender: pet.gender,
    state: pet.contact.address.state,
    description: pet.description,
    tags: pet.tags,
    url: pet.url,
  }));

  const first30Pets = formattedPets.slice(0, 851, 4);

  res.json(first30Pets);
});


// const questionsData = fs.readFileSync('questions.json');
// const questions = JSON.parse(questionsData);

const questions = require("./questions.json");


// Define the endpoint to return questions
app.get('/questions', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.json(questions);
});


app.listen(8000, () => {
  console.log(`Server is running on port 8000.`);
});

app.post('/answer', (req, res) => {
  const userAnswers = req.body;

  const userSuitabilityScore = calculateUserSuitabilityScore(userAnswers);
  const recommendedPets = getRecommendedPets(userSuitabilityScore);

  res.json({ recommendedPets })
});

// app.get('/answers'. (req.res) => {

// })

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
  const lifestyleScore = userAnswers.lifestyle.reduce((acc, answer, index) => acc + (answer / 5) * normalizedLifestyleWeights[index], 0);
  const livingConditionsScore = userAnswers.livingConditions.reduce((acc, answer, index) => acc + (answer / 5) * normalizedLivingConditionsWeights[index], 0);
  const careCapabilitiesScore = userAnswers.careCapabilities.reduce((acc, answer, index) => acc + (answer / 5) * normalizedCareCapabilitiesWeights[index], 0);

  const decimalPlaces = 6;
  const multiplier = Math.pow(10, decimalPlaces);
  const randomComponent = Math.round((Math.random() * 0.009 + 0.006) * multiplier) / multiplier;

  // Combine individual scores into an overall score
  const overallScore = (lifestyleScore + livingConditionsScore + careCapabilitiesScore) * randomComponent;

  return overallScore;
}


function getRecommendedPets(userSuitabilityScore) {

  // Calculate the absolute difference between each pet's score and the user's score
  const differences = petScores.map((pet) => Math.abs(pet.score - userSuitabilityScore));

  // Create an array of objects with pet_id, difference, and corresponding pet details
  const petDifferences = petScores.map((pet, index) => ({
    pet_id: pet.pet_id,
    difference: differences[index],
    pet_details: petsData.find(animal => animal.id === pet.pet_id)
  }));

  // Sort the array based on the difference in ascending order
  const sortedPetDifferences = petDifferences.sort((a, b) => a.difference - b.difference);

  // Take the top 5 closest pets with their details
  const closestPets = sortedPetDifferences.slice(0, 5).map(pet => pet.pet_details);

  return closestPets;
}

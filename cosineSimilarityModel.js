const natural = require("natural");
const cosineSimilarity = require("compute-cosine-similarity");

// Convert text into TF-IDF vectors using natural
function buildTfidfMatrix(userInput, jobDescriptions) {
  const tfidf = new natural.TfIdf();

  // Add user input and job descriptions to the vectorizer
  tfidf.addDocument(userInput);
  jobDescriptions.forEach((desc) => tfidf.addDocument(desc));

  const matrix = [];

  for (let i = 0; i < tfidf.documents.length; i++) {
    const vector = [];
    tfidf.listTerms(i).forEach((term) => {
      vector[term.index] = term.tfidf;
    });
    matrix.push(vector);
  }

  return matrix;
}

// Process user input
function processUserPreferences(userPreferences) {
  return [
    ...(userPreferences.job_title || []),
    ...(userPreferences.location || []),
    ...(userPreferences.skills || []),
    ...(userPreferences.work_type || []),
    ...(userPreferences.industry || []),
  ].join(" ");
}

// Main function to get top job recommendations
function calculateRecommendations(userPreferences, jobDescriptions, jobData) {
  const userText = processUserPreferences(userPreferences);
  const tfidfMatrix = buildTfidfMatrix(userText, jobDescriptions);

  const userVector = tfidfMatrix[0];
  const jobVectors = tfidfMatrix.slice(1);

  // Calculate cosine similarities
  const scores = jobVectors.map(
    (vector) => cosineSimilarity(userVector, vector) || 0
  );

  // Get top 10 similar jobs
  const topIndices = scores
    .map((score, index) => ({ score, index }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 10)
    .map((item) => item.index);

  return topIndices.map((index) => jobData[index]);
}

module.exports = { processUserPreferences, calculateRecommendations };

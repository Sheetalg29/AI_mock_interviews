const axios = require('axios');
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

async function getAIQuestions(role) {
  const prompt = `Generate 5 interview questions for the role: ${role}. Format each question as a plain line.`;
  const response = await axios.post('https://api.openai.com/v1/chat/completions', {
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
    max_tokens: 300,
    temperature: 0.7
  }, {
    headers: {
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': 'application/json'
    }
  });
  const content = response.data.choices[0].message.content;
  return content.split('\n').filter(q => q.trim());
}

async function getAIFeedbackAndScores(answers) {
  const prompt = `Review the following interview answers and provide overall feedback. Also rate Coding, Concepts, Communication, and Emotions (each 0-100). Respond in JSON: {feedback: "...", performance: {coding: ..., concepts: ..., communication: ..., emotions: ...}}\n\nAnswers:\n${answers.join('\n')}`;
  const response = await axios.post('https://api.openai.com/v1/chat/completions', {
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
    max_tokens: 300,
    temperature: 0.7
  }, {
    headers: {
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': 'application/json'
    }
  });
  const content = response.data.choices[0].message.content;
  try {
    return JSON.parse(content);
  } catch (e) {
    return {
      feedback: "Unable to parse AI response.",
      performance: { coding: 0, concepts: 0, communication: 0, emotions: 0 }
    };
  }
}

module.exports = { getAIQuestions, getAIFeedbackAndScores };
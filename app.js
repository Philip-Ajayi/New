const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(express.json());

// Route for handling /message endpoint
app.post('/message', (req, res) => {
  const message = req.body.message;
  if (message === 'How are you?') {
    res.status(200).json({ reply: "I'm fine, thank you!" });
  } else {
    res.status(400).json({ error: 'Invalid message' });
  }
});

// Function to visit the websites
const visitWebsites = async () => {
  const websites = [
    'https://audio-api-xb0r.onrender.com/',
    'https://supernaturalcampmeeting.org',
    'https://saltandlight2024.mivwordhouse.com',
  ];

  for (const url of websites) {
    try {
      const response = await axios.get(url);
      console.log(`Visited ${url}: Status ${response.status}`);
    } catch (error) {
      console.error(`Error visiting ${url}:`, error.message);
    }
  }
};

// Function to send a request to /message endpoint
const sendMessageToSelf = async () => {
  try {
    const response = await axios.post(`http://localhost:${port}/message`, {
      message: 'How are you?',
    });
    console.log(`Message response:`, response.data);
  } catch (error) {
    console.error('Error sending message to self:', error.message);
  }
};

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);

  // Schedule tasks to run every 5 minutes
  setInterval(() => {
    visitWebsites();
    sendMessageToSelf();
  }, 5 * 60 * 1000);
});
         

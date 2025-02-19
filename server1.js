// Step 2: server1.js - API Caller
const express = require('express');
const axios = require('axios');
const app = express();

// Non-Streaming Request
app.get('/test-non-stream', async (req, res) => {
  try {
    const response = await axios.get('http://localhost:3001/non-stream', { responseType: 'arraybuffer' });
    res.send('Non-stream file received');
  } catch (error) {
    res.status(500).send('Error in non-stream request');
  }
});

// Streaming Request
app.get('/test-stream', async (req, res) => {
  try {
    const response = await axios.get('http://localhost:3001/stream', { responseType: 'stream' });
    response.data.on('end', () => {
      res.send('Stream file received');
    });
    response.data.resume(); // Consume stream
  } catch (error) {
    res.status(500).send('Error in stream request');
  }
});

app.listen(3000, () => {
  console.log('Server 1 running on port 3000');
});
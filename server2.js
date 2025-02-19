// Step 1: server2.js - File Generation Server
const express = require('express');
const fs = require('fs');
const app = express();

// Non-Streaming Endpoint
app.get('/non-stream', (req, res) => {
  const filePath = 'large-file.txt';
  const fileData = fs.readFileSync(filePath); // Full file in memory
  res.setHeader('Content-Disposition', 'attachment; filename="large-file.txt"');
  res.setHeader('Content-Type', 'text/plain');
  res.send(fileData);
});

// Streaming Endpoint
app.get('/stream', (req, res) => {
  const filePath = 'large-file.txt';
  res.setHeader('Content-Disposition', 'attachment; filename="large-file.txt"');
  res.setHeader('Content-Type', 'text/plain');
  const fileStream = fs.createReadStream(filePath);
  fileStream.pipe(res);
});

app.listen(3001, () => {
  console.log('Server 2 running on port 3001');
});
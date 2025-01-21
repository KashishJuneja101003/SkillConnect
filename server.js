const path = require('path');
const express = require('express');
const app = express();

// Serve static files (CSS, JS, images) from the 'public' folder
app.use(express.static(path.join('SkillConnect', 'public')));

// Route to serve the index.html page
app.get('/', (req, res) => {
  res.sendFile(path.join('SkillConnect', 'public', 'index.html'));
});

// Your WebSocket or signaling server code here

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

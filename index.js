const express = require('express');
const path = require('path');

const app = express();
const port = 7860; // Change the port to 7860

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

const cors = require('cors');
app.use(cors());

// Middleware to parse JSON request body
app.use(express.json());

// POST route to save form data
app.post('/save-user', (req, res) => {
  const userData = req.body;

  // Define the file path
  const filePath = path.join(__dirname, 'users.json');

  // Read the existing file data (if any)
  fs.readFile(filePath, 'utf8', (err, data) => {
    let users = [];

    if (!err && data) {
      users = JSON.parse(data); // Parse existing data if file exists
    }

    // Add new user data to the array
    users.push(userData);

    // Write updated data back to the file
    fs.writeFile(filePath, JSON.stringify(users, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ message: 'Failed to save user data.' });
      }
      res.status(200).json({ message: 'User data saved successfully!' });
    });
  });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

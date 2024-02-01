const express = require('express');
const sqlite3 = require('sqlite3');

const app = express();

// Create a connection to the database
const db = new sqlite3.Database('michel.db', (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Connected to the database');
  }
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
// app.js

const express = require('express');
const sqlite3 = require('sqlite3');
const bodyParser = require('body-parser');
const session = require('express-session');


const app = express();
const port = 3000;



// Create a connection to the database
const db = new sqlite3.Database('michel.db', (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Connected to the database');
    // Create the users table if it doesn't exist
    db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT, email TEXT)');
  }
});

// Middleware to parse the body of the incoming request
app.use(bodyParser.urlencoded({ extended: true }));

// Session configuration
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: false
}));



// Route to handle the user registration form submission
app.post('/register', (req, res) => {
    const { username, password, email } = req.body;
    db.run('INSERT INTO users (username, password, email) VALUES (?, ?, ?)', [username, password, email], function(err) {
      if (err) {
        return res.status(500).send(err.message);
      }
      res.redirect('/login.html');
    });
  });
  
// Route to handle user login
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  db.get('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], function(err, row) {
    if (err) {
      return res.status(500).send(err.message);
    }
    if (row) {
      req.session.username = username; // Store the username in the session
      res.redirect('/chat.html');
    } else {
      res.status(401).send('Invalid username or password');
    }
  });
});

app.get('/get-username', (req, res) => {
  const username = req.session.username; // Retrieve the username from the session
  res.send(username);
});
  

// Serve the register.html file
app.use(express.static('public'));
// Start the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
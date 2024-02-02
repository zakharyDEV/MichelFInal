// index.js
const express = require('express');
const app = express();

// Redirect the root path to "register.html"
app.get('/', (req, res) => {
  res.redirect('/register.html');
});

module.exports = app;
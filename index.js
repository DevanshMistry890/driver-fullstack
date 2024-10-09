// Devansh Mistry 9000819

const express = require('express');
const path = require('path');
const ejs = require('ejs');
const { copyFileSync } = require('fs');
const app = new express();
const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://devansh:FPsbirZt21hBdkZW@fullstack.twtao.mongodb.net/?retryWrites=true&w=majority&appName=fullstack";

// Connect to MongoDB using Mongoose
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

})
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Parse JSON and URL-encoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// to load static js and vendors
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Home page
app.get('/', (req, res) => {
    res.render('dashboard');
});

// G route
app.get('/g', (req, res) => {
    res.render('g');
});

// G2 route
app.get('/g2', (req, res) => {
    res.render('g2');
});

// Login route
app.get('/login', (req, res) => {
    res.render('login');
});

// Start the server
app.listen(3000, () => {
    console.log('Server started on port 3000');
});


app.post('/submitg2', async (req, res) => {
  const { firstName, lastName, licenseNumber, age, dob, make, model, year, plateNumber } = req.body;

  // Use the User model you created earlier
  const User = require('./models/schema'); // Replace with actual path

  try {
    // Create a new User instance with form data
    const newUser = new User({
      firstName,
      lastName,
      licenseNumber,
      age,
      dob: new Date(dob), // Convert dob string to Date object (assuming it's a date string)
      car: {
        make,
        model,
        year,
        plateNumber
      }
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    console.log("Created user", savedUser);
    res.redirect('/'); // Redirect to homepage after successful submission
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).send('Internal Server Error');
  }
});
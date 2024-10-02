// Devansh Mistry 9000819

const express = require('express');
const path = require('path');
const ejs = require('ejs');
const { copyFileSync } = require('fs');
const app = new express();
const mongoose = require('mongoose');
const Schema = require('./schema');

const mongoURI = "mongodb+srv://devansh:${{ secrets.SECRET_KEY }}@fullstack.twtao.mongodb.net/?retryWrites=true&w=majority&appName=fullstack";

// Connect to MongoDB using Mongoose
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

})
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

const User = mongoose.model('User2', Schema);

async function createUser() {
    try {
        const newUser = new User({
            firstname: 'Dev',
            lastname: 'Wick',
            licenseNo: '123456789',
            age: 30,
            carDetails: {
                make: 'Toyota',
                model: 'Camry',
                year: 2023,
                plateNo: 'ABC123',
            },
        });

        await newUser.save();
        console.log('User created successfully');
    } catch (err) {
        console.error('Error creating user:', err);
    }
}
createUser();
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

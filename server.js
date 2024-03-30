const express = require('express');
const path = require('path');
const app = express();
const PORT = 3001;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let notes = [];

// Import the router defined in routes
const apiRouter = require('./api/routes');

app.use(express.static(path.join(__dirname, 'public')));

//API ROUTES
app.use('/api', apiRouter);

// Route to serve notes.html for '/routes'
app.get('/routes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

// Catch-all route to serve index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// listen() method is responsible for listening for incoming connections on the specified port 
app.listen(PORT, () =>
    console.log(`Sever up and at em at http://localhost:${PORT}`)
);
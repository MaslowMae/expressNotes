const express = require('express');
const path = require('path');
const router = express.Router();
const app = express();
const PORT = 3001;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let notes = [];

// Import the router defined in routes
const apiRouter = require('./api/routes');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', apiRouter);

app.get('/', (req, res) => {
    res.send('hello world')
  })

// Express.js routes 

app.get('/api/notes', (req, res) => {
    // send 'index.html' for '/expressNotes' 
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

//rout for /routes
app.get('/routes', (req, res) => {
    // send 'notes.html' for '/routes'
    res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    notes.push(newNote);
    res.status(201).json(newNote);
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// listen() method is responsible for listening for incoming connections on the specified port 
app.listen(PORT, () =>
    console.log(`Sever up and at em at http://localhost:${PORT}`)
);

module.exports =apiRouter;
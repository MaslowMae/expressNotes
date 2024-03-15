const express = require('express');
const path = require('path');
const app = express();
const PORT = 3001;
// Import the router defined in routes
const apiRouter = require('./apiRouter');


app.use(express.static('public'));
app.use('/api', apiRouter);

// Create Express.js routes for default '/', '/send' and '/routes' endpoints
// app.get('/', (req, res) => res.send(`Sent to the HTML `));

app.get('/expressNotes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);

app.get('/routes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);

// listen() method is responsible for listening for incoming connections on the specified port 
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);

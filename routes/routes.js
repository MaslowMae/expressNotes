const express = require('express');
const router = express.Router();

//define routes on the router
router.get('/api',(req, res) => {
    res.json(notes);
});

module.exports = router;

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index')
});

// create the route instance for export
module.exports = router;
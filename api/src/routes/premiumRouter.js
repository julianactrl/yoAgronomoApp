
const express = require('express');
const { premium } = require('../controllers/premiumController');
const router = express.Router();



// Rutas posts
router.post('/mp/:userId', premium);

module.exports = router;
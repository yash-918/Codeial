const express = require('express');

const router = express.Router();
const friendshipsController = require('../controllers/friendships_controller.js');
// console.log("jhjhbhjbjhbjhb989");
router.get('/create/:id', friendshipsController.create);
router.get('/breakup/:id', friendshipsController.breakup);
module.exports = router;

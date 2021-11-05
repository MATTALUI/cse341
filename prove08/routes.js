const express = require('express');
const router = express.Router();

const Prove08Controller = require('./controller');

router.get('/', Prove08Controller.index);

module.exports = router;

const express = require('express')
const controller = require('../controllers/customer-controllers')

const router = express.Router();

router.post('/', controller.post)

module.exports = router;
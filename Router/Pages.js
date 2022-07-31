const express = require('express')

const router = express.Router()

const pages_handler = require('../Router_Handler/Pages')

router.get('/home',pages_handler.homePage)

router.get('/pages/:nextPage/',pages_handler.nextPage)

module.exports = router
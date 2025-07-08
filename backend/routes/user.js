const express = require('express')
const { register } = require('../controllers/user')

let router = express.Router()

router.route("/register").post(register)

module.exports = router
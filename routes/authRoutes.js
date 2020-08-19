// const express = require('express');

// const router = express.Router();

const { Router } = require('express');

// intance of router
const router = Router();

const authController = require('../controller/authController');



router.get('/signup', authController.signup_get)
router.post('/signup', authController.signup_post)
router.get('/login', authController.login_get)
router.post('/login', authController.login_post)
router.get('/logout', )

module.exports = router;
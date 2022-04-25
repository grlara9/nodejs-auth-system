const express = require('express')
const router = express.Router()
const {registerUser, loginUser, getUsers} = require('../controllers/userController')
const {protect} = require('../middleware/authMiddleware')

router.post('/',  registerUser)
router.post('/login',  loginUser)
router.get('/me', protect, getUsers)

module.exports = router
const express = require('express');
const { register, login, getUser, updateUser, generateOTP, verifyOTP, createReset, resetPassword } = require('../controllers/userController');
const router = express.Router();

router.post('/register',register);
router.post('/registerMail',);
router.post('/authenticate',);
router.post('/login', login);

router.get('/user/:username', getUser);
router.get('/generateOTP', generateOTP);
router.get('/verifyOTP', verifyOTP);
router.get('/createReset', createReset);

router.put('/updateUser', updateUser);
router.put('/resetPassword', resetPassword)

module.exports = router

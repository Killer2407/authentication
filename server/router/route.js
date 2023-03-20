const express = require('express');
const { registerMail } = require('../controllers/mail');
const { register, verifyUser, login, getUser, updateUser, generateOTP, verifyOTP, createReset, resetPassword, getAllUser } = require('../controllers/userController');
const { auth, localVariables } = require('../middleware/auth');
const router = express.Router();

router.post('/register', register);

// router.post('/registerMail',);
router.post('/authenticate', verifyUser,(req, res) => res.end());
router.post('/login', verifyUser,login);
router.post('./registerMail',registerMail)

// router.get('/user/:username', getAllUser);
router.get('/user/:id', getUser);
router.get('/allUser', getAllUser)
router.get('/generateOTP', verifyUser, localVariables, generateOTP);
router.get('/verifyOTP', verifyOTP);
router.get('/createReset', createReset);

router.put('/updateUser/:id', auth, updateUser);
router.get('/generateOTP', verifyUser, localVariables, generateOTP);
router.put('/resetPassword', verifyUser, resetPassword)

module.exports = router

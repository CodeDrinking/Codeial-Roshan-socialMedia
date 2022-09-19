const express = require('express');
const router = express.Router();

const usersController = require('../controllers/user_controllers')

console.log("user profile")
///to be available for external use ..like public

router.get('/profile' , usersController.profile); // this fot if any request like /users/profile..this will render usercntrler home

router.get('/sign-up',usersController.signUp);
router.get('/sign-in',usersController.signIn);

router.post('/create' , usersController.create)

module.exports= router;
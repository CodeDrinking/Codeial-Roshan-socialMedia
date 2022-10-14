const express = require('express');
const router = express.Router();
const passport = require('passport')

const usersController = require('../controllers/user_controllers')

console.log("user profile")
///to be available for external use ..like public

router.get('/profile/:id' , passport.checkAuthentication, usersController.profile); // this fot if any request like /users/profile..this will render usercntrler home
router.get('/update/:id' ,passport.checkAuthentication , usersController.update )

router.get('/sign-up',usersController.signUp);
router.get('/sign-in',usersController.signIn);
router.get('/sign-out', usersController.destroySession);

router.post('/create' , usersController.create)

// router.post('/create-session' , usersController.createSession) for manual

//for passport
// use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
), usersController.createSession);



module.exports= router;
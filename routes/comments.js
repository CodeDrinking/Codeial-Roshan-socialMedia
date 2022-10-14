const express = require('express');

const router = express.Router();
const passport = require('passport')
const commentsController = require('../controllers/comments_controller')


///to be available for external use ..like public
router.post('/create' ,passport.checkAuthentication, commentsController.create); 
router.get('/destroy/:id' ,passport.checkAuthentication, commentsController.destroy); 



///for call it from users.js
module.exports= router;
const express = require('express');

const router = express.Router();
const passport = require('passport')
const postController = require('../controllers/posts_controller')


///to be available for external use ..like public
router.post('/create' ,passport.checkAuthentication, postController.create); 



///for call it from users.js
module.exports= router;
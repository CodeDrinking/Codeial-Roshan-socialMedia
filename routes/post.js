const express = require('express');
const router = express.Router();

const postController = require('../controllers/post_controller')

console.log("post is ready")
///to be available for external use ..like public

router.get('/story' , postController.story);




module.exports= router;
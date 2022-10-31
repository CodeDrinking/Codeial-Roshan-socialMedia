//root index for all the routes

const express = require('express');
const router = express.Router();

const homeController = require('../controllers/home_controller');


console.log("relax boy!! you got this..")
///to be available for external use ..like public

router.get('/' , homeController.home); // this for rendering home page and this will go to home contrller
router.use('/users' , require('./users')) // this is for if users comes up after localhost/ , now this will go in users.js
router.use('/posts' ,require('./posts'))
router.use('/comments' ,require('./comments'))

router.use('/api' , require('./api'))

// for any further routes ,access from here
//eg:  router.use('/routerName' , require('./routerFile'))

module.exports= router;
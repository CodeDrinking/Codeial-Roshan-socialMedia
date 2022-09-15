const express = require('express');
const router = express.Router();

const homeController = require('../controllers/home_controller');
const { route } = require('./users');

console.log("relax boy!! you got this..")
///to be available for external use ..like public

router.get('/' , homeController.girl); // this for rendering home page and this will go to home contrller
router.use('/users' , require('./users')) // this is for if users comes up after localhost/ , now this will go in users.js
router.use('/post' ,require('./post'))

// for any further routes ,access from here
//eg:  router.use('/routerName' , require('./routerFile'))

module.exports= router;
const express = require('express');
const cookieParser = require('cookie-parser')
const app = express();
const port= 8000;
const expressLayouts= require('express-ejs-layouts');
const db= require('./config/mongoose')


app.use(express.urlencoded());
app.use(cookieParser());
app.use(expressLayouts);


//extrats style and scripts from sub pages into the layout
app.set('layout extractStyles' ,true)
app.set('layout extractScripts' ,true)
//set up of sttaic files
app.use(express.static('./assets'))

//use express router
app.use('/', require('./routes'))  // this for req for all routes , go to index.js of route 
//this is entry point for routes

//set ejs in server .
app.set('view engine', 'ejs'); //key value pair
app.set('views' , './views')

app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on  port  ${port}`)
})
const express = require('express');
const app = express();
const port= 8000;


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
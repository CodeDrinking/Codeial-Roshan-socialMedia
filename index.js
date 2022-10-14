const express = require('express');
const cookieParser = require('cookie-parser')
const app = express();
const port= 8000;
const expressLayouts= require('express-ejs-layouts');
const db= require('./config/mongoose')

//USE  sessio cookie and local authentication of passport
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-statergy');
const MongoStore = require('connect-mongo')(session);
// const sassMiddleware = require('node-sass-middleware')
const flash = require('connect-flash');
const customMware = require('./config/middleware')

// app.use(sassMiddleware({
//     src: './assets/css'
//     , dest: './assets/css'
//     , debug: true
//     , outputStyle: 'extended'
//     , prefix:  '/css'  

// }));

app.use(express.urlencoded());
app.use(cookieParser());
app.use(expressLayouts);



//extrats style and scripts from sub pages into the layout
app.set('layout extractStyles' ,true)
app.set('layout extractScripts' ,true)
//set up of sttaic files
app.use(express.static('./assets'))
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));



//set ejs in server .
app.set('view engine', 'ejs'); //key value pair
app.set('views' , './views')

app.use(session ({
    name: 'codeial',
    secret : 'blahSomething',
    saveUninitialized : false,
    resave : false,
    cookie : {
        maxAge :(100 * 60 * 100)
    },
    store: new MongoStore(
    {
        mongooseConnection : db,
        autoRemove :'disabled'
    },
    //callback fun incase connectionis not established
    function(err){
        console.log(err ||'connect-mongo setup is ok')
    }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);
app.use(flash())
app.use(customMware.setFlash);

//use express router
app.use('/', require('./routes'))  // this for req for all routes , go to index.js of route 
//this is entry point for routes

app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on  port  ${port}`)
})
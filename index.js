const express = require('express');
const logger = require('morgan')
const env= require('./config/environment')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const app = express(); 
const port= 8000;
const expressLayouts= require('express-ejs-layouts');
const db= require('./config/mongoose')

//USE  sessio cookie and local authentication of passport
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-statergy');
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-Stategy')
const MongoStore = require('connect-mongo')(session);
// const sassMiddleware = require('node-sass-middleware')
const flash = require('connect-flash');
const customMware = require('./config/middleware');


//setting unp chat server
// const chatServer = require('http').Server(app);
// const chatsockets = require ('./config/chat_socket').chatsockets(chatServer);
// chatServer.listen(5000);

console.log/("chat server is listening on port 5000")
// const path = require('path')

// app.use(sassMiddleware({
//     src: path.join(__dirname , env.asset_path , 'css'),
//     dest : path.join(__dirname ,env.asset_path , 'scss')
//     , debug: true
//     , outputStyle: 'extended'
//     , prefix:  '/css'  

// }));

if(env.name=='development'){
}
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(expressLayouts);



//extrats style and scripts from sub pages into the layout
app.set('layout extractStyles' ,true)
app.set('layout extractScripts' ,true)
//set up of sttaic files
app.use(express.static(env.asset_path))

//make the upload path available for browser
app.use('/uploads' , express.static(__dirname + '/uploads'));

app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

app.use(logger(env.morgan.mode , env.morgan.options));



//set ejs in server .
app.set('view engine', 'ejs'); //key value pair
app.set('views' , './views')

app.use(session ({
    name: 'codeial',
    secret : env.session_cookie_key,
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

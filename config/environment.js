const fs = require('fs');
const rfs = require('rotating-file-stream')
const path  = require('path');

const logDirectory =path.join(__dirname , '../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access.log' , {
    interval : "1d",
    path :logDirectory
})

const development ={
    name : 'development',
    asset_path : './assets',
    session_cookie_key : 'blahSomething',
    db :'codeial_development',
    smtp :{
        service : 'Gmail',
        //they've created for us to interract with
        host  : 'smtp.gmail.com',  // TLS uses smtp
        port : 587 , //TLS most secure layer
        secure : false ,
        auth : {
            user :  'mestri.roshan2526@gmail.com',
            pass : 'Roshan@1102'
    },
},
    google_client_ID : "788810000089-lv621rtcrmrvost7l9a33bgp2b1714rt.apps.googleusercontent.com",
    google_client_Secret :"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",
   google_call_back_URL : "http://localhost:8000/users/auth/google/callback" ,
   JWT_secret_key : 'codeial',
   morgan : {
    mode:'dev',
    options : {stream : accessLogStream}
   }

}

const production ={
    name : 'production',
    asset_path : process.env.CODEIAL_ASSET_PATH,
    session_cookie_key : process.env.CODEIAL_SESSION_COOKIE_KEY,
    db :process.env.CODEIAL_DB_NAME,
    smtp :{
        service : 'Gmail',
        //they've created for us to interract with  
        host  : 'smtp.gmail.com',  // TLS uses smtp
        port : 587 , //TLS most secure layer
        secure : false ,
        auth : {
            user :  'mestri.roshan2526@gmail.com',
            pass : 'Roshan@1102'
    },
},
    google_client_ID : process.env.CODEIAL_GOOGLE_CLIENT_ID,
    google_client_Secret :process.env.CODEIAL_GOOGLE_CLIENT_SECRET,
    
   google_call_back_URL : process.env.CODEIAL_GOOGLE_CALLBACK_URL ,
   JWT_secret_key : process.env.CODEIAL_JWT_SECRET,
   morgan : {
    mode:'combined',
    options : {stream : accessLogStream}
   }
}

module.exports= eval(process.env.CODEIAL_ENVIRONMENT) == undefined ? development: eval(process.env.CODEIAL_ENVIRONMENT);


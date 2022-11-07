const nodemailer = require('nodemailer');
const ejs = require ('ejs');
const path = require ('path');




//object which is attached to nodemailer

//trranporter is who sends email
let transporter  = nodemailer.createTransport({
    service : 'Gmail',
    //they've created for us to interract with
    host  : 'smtp.gmail.com',  // TLS uses smtp
    port : 587 , //TLS most secure layer
    secure : false ,
    auth : {
        user :  'mestri.roshan2526@gmail.com',
        pass : 'Roshan@1102'
    }
});


//rendertemplte is for rendering a views file which is mailers.ejs
let renderTemplate = (data , relativePath) => {
    let mailHTML;
    ejs.renderFile(
        path.join (__dirname , '../views/mailers' ,relativePath), // joining current directory to view's maileers file
        data ,
        function(err , template ){
            if(err) { console.log(" error in rendering template"); 
            return; 
            }
            mailHTML = template;
        }
    )
    return mailHTML;

}
//we are going to export this and use it wherever we are sending thid email
module.exports = {
    transporter : transporter,
    renderTemplate : renderTemplate
}


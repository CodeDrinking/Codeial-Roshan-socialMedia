const nodemailer = require('nodemailer');
const ejs = require ('ejs');
const path = require ('path');
const env = require('./environment')




//object which is attached to nodemailer

//trranporter is who sends email
let transporter  = nodemailer.createTransport(env.smtp);


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


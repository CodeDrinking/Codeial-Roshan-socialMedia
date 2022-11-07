const nodemailer = require('../config/nodemailer');
const nodeMailer = require ('../config/nodemailer')

//fucntion which will send that mail
//this is another way of exporting method
exports.newComment = (comment) =>{
    console.log('inside newComment mailer');

    let htmlString =nodemailer.renderTemplate({comment:comment}, './comments/new_comment.ejs')

    nodeMailer.transporter.sendMail({// sendMail is a predefined fucntion
        from: 'roshanmestri1999@gmail.com',
        to : comment.user.email,
        subject: "New Comment Published!",
        html : htmlString

    }, (err , info) => {
        if(err){
            console.log('error in sending mail' , err);
            return;
        }
         console.log('mail delivered', info);
         return;
    }) 
}
// module.exports.profile= function(req, res){
//     return res.end('<h1>this is my profile </h1>')
// }

module.exports.profile= function(req, res){
    return res.render('users' ,{
        title: "usersHome"
    })
}


// module.exports.home= function(req, res){
//     return res.end('<h1>express is up for codeial </h1>')
// }

module.exports.home= function(req, res){
    return res.render('home',{
        title: "Jai Hind"
    });
}

// module.exports.girl= function(req, res){
//     return res.end('<h1>that girl is insanely intelligent !!!!!! </h1>')
// }
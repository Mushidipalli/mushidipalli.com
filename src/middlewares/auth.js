const  jwt = require('jsonwebtoken');
const  ENV = require('../../config');

module.exports.Auth = async (req, res, next)=>{
    try {
       
       const token = req.headers.authorization;


       const decodedToken =  await jwt.verify(token, ENV.valus.JWT_SECRET);
       req.user = decodedToken;

       next();
        
    } catch (error) {
        res.status(401).json({erroe: "Authentication Faild"});
        
    }
}
const User = require('../models/User');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const ENV = require('../../config');
const bcrypt = require('bcrypt');



// render the sign in page
module.exports.signIn = async function(req, res,next){

    try {
          const errors = validationResult(req);
          if(!errors.isEmpty()){
            res.status(400).json({ errors: errors.array() });
          }else{
            
            
            const user = await User.findOne({contact:req.body.contact});
            if (!user) {
              res.status(400).json({
                message:'No user with this Phone Number'
              });
            }else{
              const isMatch = bcrypt.compareSync(req.body.password, user.password);
              if (!isMatch) {
                return res.status(400).json({
                  message:'Invalid password'
                });
              } 

              const token = jwt.sign({
                userId: user._id,
                name : user.name
              },ENV.valus.JWT_SECRET,{expiresIn : "24h"});
              const { password, ...userData } = user;

              
     
              res.status(200).json({
                msg: "Login Successfull",
                user: userData,
                token
              });

            }

            

          }
          
        } catch (error) {
          // res.status(401).json({ error: error.message });
          next(error);
        }
}

// get the sign up data
module.exports.signUp = async function(req, res){
    
    try {
      
      const errors = validationResult(req);
      if(!errors.isEmpty()){  
        res.status(400).json({ errors: errors.array() });
      }else{
              
              const checkUser = await User.findOne({contact:req.body.contact});
              console.log(checkUser);
              if(checkUser){
                  return res.status(400).json({
                    message:'Phone Number already existed'
                  })

              }else{
                const hashPassword = await bcrypt.hash(req.body.password, 10,);
      
                const user = new User({name:req.body.name,email:req.body.email,contact:req.body.contact,permanentAddress:req.body.permanentAddress,designation:req.body.designation,currentAddress:req.body.currentAddress,gender:req.body.gender,password:hashPassword});
                 await user.save();
                 return res.status(200).json({
                  message:'Signup successful',
  
                })

          }
          
      }
      
  } catch (error) {
    console.log(error);
    error.message='Signup faild'
   return res.status(500).json(error.message);

      
  }
     
}

module.exports.update = async function(req, res,next){
  // req.flash('success', 'You have logged out!');
  try {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
       
        res.status(400).json({ errors: errors.array() });
    }else{
       const user = await User.findByIdAndUpdate(req.body.user._id,{ new: true });
       if(!user){
           const error = new Error('user not found');
           next(error);

        }else{

            res.status(200).json({
                message:'User updated successful',
                item
     
             });
           
        }
       
        
    }

    
    
  } catch (error) {
    next(error);
    
  }

    
   
}



module.exports.allUsers = async function(req, res,next){
   
     // req.flash('success', 'You have logged out!');
       try {
        const users = await User.find({});
        res.status(200).json({
          users
        })
        
       } catch (error) {
          next(error);
        
       }
      
    
}


module.exports.verification = async (req,res)=>{
  try {
    const user = await User.findById(req.user.userId);
    if(!user){
      return res.status(400).json({
        message:'User not found'

      })
    }else{
      return res.status(200).json(user);
    }

    
  } catch (error) {
    return res.status(400).json({
      message:'Internal server error'
    })
    
  }

}





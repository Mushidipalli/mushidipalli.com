
const Admin = require('../models/AdminModel');
const User = require('../models/User');
const { findById } = require('../models/User');
const {validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const  ENV = require('../../config');


module.exports.adminLogin = async (req, res)=>{
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
          res.status(400).json({ errors: errors.array() });
        }else{
            const { contact, password } = req.body;

            const admin = await Admin.findOne({ contact});
            if (!admin) {
              return res.status(400).json({
                message:'Invalid credentials'
              })
            }

            const isMatch = bcrypt.compareSync(password, admin.password);
            if (!isMatch) {
              return res.status(400).json({
                message:'Invalid credentials'
              })
              
            } 

          const token = jwt.sign({
            userId: admin._id,
            name : admin.name
          },ENV.valus.JWT_ADMIN_SECRET,{expiresIn : "24h"});
   
          res.status(200).json({
            msg: "Login Successfull",
            name: admin.name,
            token
          });

        }
        
      } catch (error) {
        console.log(error);
        res.status(500).json({ message:'Internal server Error' });
      }
  }


  


  module.exports.userAccountVerification = async (req, res)=>{
     try {
      
      const user = await User.findById(req.body.id);
      if(!user){
        return res.status(400).json({
          message:'User not found'
        })
      }
      user.verified=true
      await user.save();
      return res.status(200).json({
        message:'User Verified'
      })
      
     } catch (error) {
      console.log(error);
      return res.status(500).json({
        message:'Internal Server Error'
      })
      
     }

  }


  module.exports.deleteUser = async (req, res)=>{

    try {
      
      const user = await User.findByIdAndDelete(req.body.id);
      if(!user){
        return res.status(400).json({
          message:'User not found'
        })
      }
      return res.status(200).json({
        message:'User Deleted'
      })
      
     } catch (error) {
     
      return res.status(500).json({
        message:'Internal Server Error'
      })
      
     }

  }
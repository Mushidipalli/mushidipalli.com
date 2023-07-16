
const Admin = require('../models/AdminModel');


module.exports.adminLogin = async (req, res)=>{
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
          res.status(400).json({ errors: errors.array() });
        }else{
            const { contact, password } = req.body;
            const admin = await Admin.findOne({ contact});
            if (!admin) {
              throw new Error('Invalid credentials');
            }

            const isMatch = bcrypt.compareSync(password, admin.password);
            if (!isMatch) {
              throw new Error('Invalid credentials');
            } 

          const token = jwt.sign({
            userId: admin._id,
            name : admin.name
          },ENV.valus.JWT_SECRET,{expiresIn : "24h"});
   
          res.status(200).json({
            msg: "Login Successfull",
            name: admin.name,
            token
          });

        }
        
      } catch (error) {
        res.status(401).json({ error: error.message });
      }
  }
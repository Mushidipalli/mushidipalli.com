const { body} = require('express-validator');




// error handling controller
module.exports.errorHandling = (err, req, res, next) => {
    
    if (err.name === 'ValidationError') {
        // Handle validation errors
        return res.status(400).json({ error: err.message });
      }
      
      // Handle other types of errors
      console.error('An error occurred:', err);
      return res.status(500).json({ error: 'Internal Server Error' });


}

// input validation from the request  for adding item
exports.dataValidation = [
    body('name').notEmpty().withMessage('name is required'),
    body('contact').notEmpty().withMessage('contact is required'),
    body('email').notEmpty().withMessage('email is required'),
    body('designation').notEmpty().withMessage('designation is required'),
    body('gender').notEmpty().withMessage('gender is required'),
    body('permanentAddress').notEmpty().withMessage('PermanentAdress is required'),
    body('currentAddress').notEmpty().withMessage('currentAddress is required'),
    body('password').notEmpty().withMessage('password is required'),

]

// input validation from the request for updating the item
exports.updateDataValidation = [

    body('designation').optional().notEmpty().withMessage('designation is required'),
    body('currentAddress').optional().notEmpty().withMessage('currentAddress is required'),
    
]

exports.loginDataValidation = [
    body('contact').notEmpty().withMessage('contact is required'),
    body('password').notEmpty().withMessage('password is required')
    
]


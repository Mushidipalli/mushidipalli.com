const authentication = require('../../middlewares/auth');

const express = require('express');
const dataValidator = require('../../middlewares/errorHandling');
const router = express.Router();
const usersController = require('../../controllers/users_controller');
// the below routera are used to signin & signup and create user 
router.get('/all_users',usersController.allUsers) ;
router.post('/sign_in',dataValidator.loginDataValidation,usersController.signIn);
router.post('/sign_up',dataValidator.dataValidation,usersController.signUp);
router.put('/update',dataValidator.updateDataValidation,authentication.Auth,usersController.update);
router.get('/request',usersController.reqest);
router.get('/verifyUser',authentication.Auth,usersController.verification);
module.exports = router;
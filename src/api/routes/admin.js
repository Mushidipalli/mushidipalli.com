const express = require('express');
const router = express.Router();
const adminController = require('../../controllers/admin_controller');
const authentication = require('../../middlewares/auth');

router.post('/login',adminController.adminLogin);
router.put('/users/verify',authentication.adminAuth,adminController.userAccountVerification);
router.put('/users/delete',authentication.adminAuth,adminController.deleteUser);




module.exports = router;
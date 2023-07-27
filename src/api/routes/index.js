const express = require('express');
const router = express.Router();
const Ip = require('../../models/Ip');
router.use('/users',require('./users'));
router.use('/admin',require('./admin'));
router.post('/visitors',async(req, res)=>{
    try {

        const checkIp = await Ip.findOne({ip:req.body.ip});
        const count = await Ip.find({});
        if(checkIp){
            return res.status(200).json({
                visitcount:count.length
            })

        }else{
            const ip = new Ip({ip:req.body.ip});
            await ip.save();
            return res.status(200).json({
                visitcount:count.length+1
            })
        }

        
    } catch (error) {
        
        return res.status(500).json({
            message:'errorn in visitors server'
        })
        
    }

})


module.exports = router;
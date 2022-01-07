var express = require('express');
const { File } = require('web3.storage');
var router = express.Router();
var web3Storage = require('../code/store')
/* GET users listing. */

const multer  = require('multer')
const upload = multer()

router.post('/upfile2',upload.single('img'), async function(req, res, next) {
    res.json({
        state: 'success', 
        cid: 'bafybeifsohkuaqmwcr5j4uweaho3hizg4djyp6ashas76ov2wz3dibtfke'
    })
});
router.post('/upfile',upload.single('img'), async function(req, res, next) {
    
    //console.log(req.query.path);
    
    var mess = req.body.mess;
    var sign = req.body.sign;
    var img =  req.file;
    // console.log(mess)
    // console.log(img.buffer)
    // console.log(sign)
    
    // create file
    const buffer_mess = Buffer.from(mess)
    const messFile =  new File([buffer_mess],'message.txt')

    const buffer_img = Buffer.from(img.buffer);
    const imgFile = new File([buffer_img],'image.jpg')
    
    const buffer_sign = Buffer.from(sign)
    const signFile =  new File([buffer_sign],'signature.txt')


    const files = [messFile,imgFile,signFile]
    console.log(files)

    // up files
    try {
        var cid = await web3Storage.storeWithProgress(files);
        res.json({
            state:"success",
            cid:cid
        })
    } catch (error) {
        res.json({
            state:"failed",
            mess:error
        })
    } 
    // res.json({
    //     state: 'success', 
    //     cid: 'bafybeifsohkuaqmwcr5j4uweaho3hizg4djyp6ashas76ov2wz3dibtfke'
    // })
});

module.exports = router;

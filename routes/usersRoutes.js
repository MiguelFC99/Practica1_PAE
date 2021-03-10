'use strict';
const express = require('express');
const {User} = require('./../models');
const multer = require('multer');

const multerStorage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null,'uploads')
    },
    filename: (req, file, cb)=>{
        cb(null, file.originalname);
    }
});
const fileFilter = (req, file, cb)=>{
    const flag = file.mimetype.startsWith('image');
    cb(null, flag);
};


const uploadFile = multer({
    storage: multerStorage,
    fileFilter: fileFilter
})


const router = express();

router.get('/',(req,res)=>{
    User.find({},(err,result)=>{

    })
});


router.post('/reg',uploadFile.single('profilePic'),(req, res)=>{
    console.log(req.file,req.body)
    if(req.file){
        console.log('resultado:', req.body, req.file)
        res.send('imagen guardada y usuario recibido');
        
    }else{
        res.send('archivo incorrecto o sin archivo');
    }
})

module.exports = router; 
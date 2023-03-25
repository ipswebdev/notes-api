const express = require('express');
const { isValid } = require('ipaddr.js');
const { diskStorage } = require('multer');
const path = require('path');
const multer = require('multer');
const Note = require('../models/note');

const router = express.Router();

const IMAGE_TYPE_MAP = {
    'image/png':'png',
    'image/jpg':'jpg',
    'image/jpeg':'jpeg',
    'image/svg':'svg'
}

const storage = multer.diskStorage({
    destination : (req,file,cb) =>{
        const ext = IMAGE_TYPE_MAP[file.mimetype]
        let error = new Error('Invalid Asset Type')
        const folder = `${__dirname}\images`;
        console.log('str',folder)
        if(ext){
            error = null;
            // cb(null,__dirname+"\images")
        }
            cb(error,'./images')  
    },
    filename : (req,file,cb) =>{
        const fileName = file.originalname.toLocaleLowerCase().split(' ').join('-');
        const ext = IMAGE_TYPE_MAP[file.mimetype]
        cb(null,fileName+'-'+Date.now()+'.'+ext)
    }
}
)




router.post('',multer({storage:storage}).single('image'),(req,res)=>{
    // const note = req.body
    const url = req.protocol + '://' + req.get('host');
    const note = new Note({
        title:req.body.title,
        description:req.body.description,
        imagePath: url+'/images/'+req.file.filename
    })
    // notes.push(note)
    note.save().then(result=>{
        console.log('post then res',result)
        res.status(201).json({
            message:'success',
            note:{
                title:result.title,
                description:result.description,
                id:result._id,
                imagePath:result.imagePath
            }
        })
    });

    
})

router.get('',(req,res)=>{
    console.log('First req');
    const data = {};
    Note.find().then((documents)=>{
        console.log('fetched notes',documents)
        data.message = 'successfully fetched notes';
        data.notes = documents;
        res.status(200).json(data);
    })
   
})

router.get('/:id',(req,res)=>{
    const id = req.params.id;
    const data = {};
    Note.findById({_id:id}).then((note)=>{
        if(note){
            data.message = 'successfully fetched notes';
            data.note = note;
            res.status(200).json(data);
        }else{
            console.log('inside else')
            data.message = 'No post found!';
            res.status(404).json(data); 
        }
    }).catch(err=>{
        console.log('inside catch',err)
        data.message = 'No post found!';
        res.status(404).json(data);
    })
   
})

router.delete('/:id',(req,res)=>{
    const id = req.params.id;
    const data = {};
    Note.deleteOne({_id:id}).then(()=>{
        data.message = 'successfully fetched notes';
        res.status(200).json(data);
    })
   
})

router.put('/:id',(req,res,next)=>{
    const id = req.params.id;
    const note = new Note({
        _id: id,
        title:req.body.title,
        description:req.body.description
    })
    console.log(note);
    Note.updateOne({_id:id},note).then(result=>{
        console.log(result)
        res.status(200).send({message:'note successfully updated!'});
    })
})

module.exports = router;
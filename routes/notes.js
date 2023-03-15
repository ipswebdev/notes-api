const express = require('express');
const Note = require('../models/note');

const router = express.Router();


router.post('',(req,res)=>{
    // const note = req.body
    const note = new Note({title:req.body.title,description:req.body.description})
    console.log(note);
    // notes.push(note)
    note.save().then(result=>{
        console.log('post then res',result)
    });

    res.status(201).json({
        message:'success'
    })
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
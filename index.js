const http = require('http')
const express = require('express');
const mongoose = require('mongoose');

const notesRoutes = require('./routes/notes');

const app = express();
mongoose.connect('mongodb+srv://Pranay:CXzZvx8VMdKBn3GB@cluster0.sak1dpx.mongodb.net/notes?retryWrites=true&w=majority')
.then(data=>{
    console.log('connected to MongoDB')
})
.catch(data=>{
    console.log('connection to MongoDB Failed')
})

app.use(express.json());
// app.use(express.urlencoded({extended:false}));

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept')
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, PATCH, DELETE, OPTIONS');
    next();
});

app.use('/api/notes',notesRoutes);


app.listen(3000)
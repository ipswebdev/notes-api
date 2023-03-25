const http = require('http')
const express = require('express');
const mongoose = require('mongoose');

const notesRoutes = require('./routes/notes');
const path = require('path');

const app = express();
mongoose.connect('mongodb+srv://Pranay:tt2OUx16RhMqwB94@cluster0.sak1dpx.mongodb.net/notes?retryWrites=true&w=majority')
.then(data=>{
    console.log('connected to MongoDB')
})
.catch(data=>{
    console.log('connection to MongoDB Failed')
})

app.use(express.json());
app.use("/images",express.static(path.join('images')))
// app.use(express.urlencoded({extended:false}));

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept')
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, PATCH, DELETE, OPTIONS');
    next();
});

app.use('/api/notes',notesRoutes);


app.listen(3000)
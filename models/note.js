const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
    title: { type:String, required:true },
    description: { type:String, default:'' },
    imagePath: { type : String, default: ''}
})

module.exports = mongoose.model('Note', noteSchema);
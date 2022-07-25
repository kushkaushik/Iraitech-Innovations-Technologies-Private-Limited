const mongoose = require('mongoose')
const {ObjectId} = mongoose.Types
const NewSch = new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    desc:{
        type:String,
        require:true
    },
    postedBy:{
        type:ObjectId,
        ref:"myintern"
    }
})

mongoose.model("protected",NewSch)
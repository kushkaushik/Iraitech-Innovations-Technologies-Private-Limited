const express = require('express')
const { model, default: mongoose } = require('mongoose')
const loginmid = require('../middle/loginmid')
const route = express.Router()
const POSTING = mongoose.model('protected')

route.post('/send',loginmid,(req,res)=>{
    const {title,desc} = req.body
    if(!title || !desc){
        return res.status(404).json({message:"Please Enter Something"})
    }
console.log(req.user)

    const temp = new POSTING({
        title,desc,postedBy:req.user
    })
    temp.save().then(result=>{
        return res.status(200).json({result})
    })

})



route.get('/view_all',loginmid,(req,res)=>{
    POSTING.find({}).populate("postedBy","email password").then(data=>{
        res.json({data})
    })
})



route.get('/mypost',loginmid,(req,res)=>{
    console.log(req.user)
    POSTING.find({postedBy:req.user._id}).populate("postedBy","id email").then(data=>{
        res.json({data});
    })    
})



route.delete('/del/:_id',loginmid,(req,res)=>{
    POSTING.findByIdAndDelete(req.params._id).then(result=>{
        res.json(result)
    })
})


module.exports = route
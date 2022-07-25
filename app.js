const express = require('express')
const app = express()
const mongoose = require('mongoose')
const {URI}  = require('./db')

app.use(express.json())
app.use(express.urlencoded({extended:true}))

mongoose.connect(URI)
mongoose.connection.on('connected',()=>{
    console.log("Successfully connected to Database")
})

mongoose.connection.on('error',()=>{
    console.log('something wrong')
})





require('./Schema/UserSch')
require('./Schema/Protected')
app.use(require('./Router/auth'))
app.use(require('./Router/post'))



app.listen(9000,()=>{
    console.log("Connected to 9000 Port")
})
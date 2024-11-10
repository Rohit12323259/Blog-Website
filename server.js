
const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const port = 3019

const app = express()
app.use(express.static(__dirname));
app.use(express.urlencoded({extended:true}))

mongoose.connect('mongodb://127.0.0.1:27017/Students')

const db = mongoose.connection
db.once('open',()=>{
    console.log("Successful")
})

const userSchema= new mongoose.Schema({
    namee:String,
    number:String,
    phone:String,
    email:String
})

const Users = mongoose.model("data",userSchema)

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'contact.html'))
})

app.post('/post',async(req,res)=>{
    const{namee,number,phone,email}=req.body
    const user=new Users({
        namee,
        number,
        phone,
        email
    })
    await user.save()
    console.log(user)
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Submission Success</title>
            <style>
        body {
       font-family: Arial, sans-serif;
          background-color: #f4f4f4;
     text-align: center;
     padding: 50px;
        }

        h1 {
        color: #4CAF50;
    }

    .back-button {
        display: inline-block;
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #008CBA;
    color: white;
    text-decoration: none;
    border-radius: 5px;
    }

        .back-button:hover {
    background-color: #005f73;
    }
    </style>
            </head>
        <body>
            <h1>Submitted Successfully!</h1>
            <p>Your details have been submitted successfully.</p>
            <a href="/" class="back-button">Go Back to Home</a> <!-- Add a back button -->
        </body>
        </html>
    `)
})
app.listen(port,()=>{
    console.log("Server Started")
})
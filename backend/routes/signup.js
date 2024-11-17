const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const router = express.Router()

router.post('/signup',async (req,res)=>{
    const {firstName,lastName,userName,email,password} = req.body

    try {
        const existingUser = await User.findOne({email});
        if(existingUser){
            res.status(400).json({message: "User already exists"})
        }

        const hashedPassword = await bcrypt.hash(password,10)
        const newUser = new User({
            firstName,
            lastName,
            userName,
            email,
            password: hashedPassword
        });

        await newUser.save();

        res.status(201).json({message: "User created successfully"});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
})

module.exports = router
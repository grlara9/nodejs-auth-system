const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/userModel')

const getUsers = asyncHandler(async(req, res) =>{
   

    res.status(200).json({message: 'get users'})
})

const loginUser = asyncHandler(async(req, res)=>{
   
     res.status(200).json({message: 'login user success'})
})

const registerUser = asyncHandler(async(req, res)=>{
    const {name, email, password} = req.body
    if(!name || !email || !password){
        res.status(400)
        throw new Error('all fields must be added')
    }
    res.status(200).json({message: 'register users success'})
})

module.exports = 
{
    getUsers,
    loginUser,
    registerUser,
}
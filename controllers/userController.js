const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/userModel')

const getUsers = asyncHandler(async(req, res) =>{
   

    res.status(200).json({message: 'get users'})
})

const loginUser = asyncHandler(async(req, res)=>{

  const {email, password} = req.body

  const user = await User.findOne({email})

  if(user && (await bcrypt.compare(password, user.password))){
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email
    })
  }else{
    res.status(400)
    throw new Error('invalid user data')
  }
   
     res.json({message: 'login user success'})
})

const registerUser = asyncHandler(async(req, res)=>{
    const {name, email, password} = req.body
    if(!name || !email || !password){
        res.status(400)
        throw new Error('all fields must be added')
    }

    const userExist = await User.findOne({email})

    if(userExist){
        res.status(400)
        throw new Error('User already exist')
    }

    //hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
      })

      if (user) {
        res.status(201).json({
          _id: user.id,
          name: user.name,
          email: user.email,
         
        })
      } else {
        res.status(400)
        throw new Error('Invalid user data')
      }
})

module.exports = 
{
    getUsers,
    loginUser,
    registerUser,
}
const asyncHandler = require('express-async-handler')
const Goal = require('../models/goalModel')
const User = require('../models/userModel')
const getGoals = asyncHandler(async (req, res) =>{


    const goals = await Goal.find({user: req.user.id})

    res.status(200).json(goals)
}) 

const setGoals = asyncHandler(async (req, res)=> {
   if(!req.body.text){
       res.status(400)
       throw new Error('please add a text field')
   }
 
   const goal = await Goal.create({
       text: req.body.text,
       user: req.user.id,
   })
    res.status(200).json(goal)
})

//Update goal
const updateGoal = asyncHandler( async(req, res)=>{

    const goals = await Goal.findById(req.params.id)

    if(!goals){
        res.status(400)
        throw new Error('Goal not Found')
    }

    const user = await User.findById(req.user.id)

    if(!user){
        res.status(401)
        throw new Error('User Not Found')
    }

    if(goal.user.toString() !== user.id){
        res.status(401)
        throw new Error('User not authorized')
    }
    
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body.text, {new: true})

    res.status(200).json(updatedGoal)
})

const deleteGoal = asyncHandler( async(req, res)=>{
    const goals = await Goal.findById(req.params.id)

    
    if(!goals){
        res.status(400)
        throw new Error('Goal not Found')
    }

    const user = await User.findById(req.user.id)

    if(!user){
        res.status(401)
        throw new Error('User Not Found')
    }

    if(goal.user.toString() !== user.id){
        res.status(401)
        throw new Error('User not authorized')
    }
    
    await goals.remove()
    res.status(200).json({id: req.params.id})
})
module.exports = 
{
    getGoals,
    setGoals,
    updateGoal,
    deleteGoal,
}
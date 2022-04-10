const asyncHandler = require('express-async-handler')
const Goal = require('../models/goalModel')

const getGoals = asyncHandler(async (req, res) =>{

    const goals = await Goal.find()

    res.status(200).json(goals)
}) 

const setGoals = asyncHandler(async (req, res)=> {
   if(!req.body.text){
       res.status(400)
       throw new Error('please add a text field')
   }

   const goal = await Goal.create({
       text: req.body.text
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

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body.text, {new: true})

    res.status(200).json(updateGoal)
})

const deleteGoal = asyncHandler( async(req, res)=>{
    res.status(200).json({ message: `delete goal ${req.params.id}`  })
})
module.exports = 
{
    getGoals,
    setGoals,
    updateGoal,
    deleteGoal,
}
const Task = require('../models/task.js')

const getAllTasks = async (req, res) => {
    try{
        const tasks = await Task.find({});
        res.status(201).json({tasks})
    }catch(err){
        res.status(500).json({msg: err})
    }
}

const createTask = async (req, res) => {
    try{
        const tasks = await Task.create(req.body)
        res.status(201).json({tasks})
    }catch(err){
        res.status(500).json({msg: err})
    }
    
}

const getTask = async (req, res) => {
    const {id: taskID} = req.params
    try{
        const task = await Task.findOne({_id: taskID})
        if(!task){
            return res.status(404).json({msg: `No task with id : ${taskID}`})
        }
        res.status(201).json({task});
    }catch(err){
        res.status(500).json({msg: err})
    }
}

const updateTask = async (req, res) => {
    const { id: taskID } = req.params
    try {
        const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
            new: true,
            runValidators: true,
            overwrite: true
        })
        if (!task) {
            return (`No task with id : ${taskID}`, 404)
        }
        res.status(200).json({ task })
    } catch (error) {
        res.status(404).send()
    }
}

const deleteTask = async (req, res) => {
    const {id: taskID} = req.params
    try{
        const tasks = await Task.findByIdAndDelete(taskID)
        if(!tasks){
            return res.status(404).json({msg: `No task with id : ${taskID}`})
        }
        res.status(200).json({tasks: null, status : 'success'})
    }catch(err){
        res.status(500).json({msg: err})

    }
    
}

module.exports = {
    getAllTasks,
    createTask,
    updateTask,
    getTask,
    deleteTask
}
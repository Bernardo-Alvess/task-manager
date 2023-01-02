const Task = require('../models/task.js')
const asyncWrapper = require('../middleware/async')

const getAllTasks = asyncWrapper( async (req, res) => {
        const tasks = await Task.find({});
        res.status(201).json({tasks})
 })

const createTask = asyncWrapper( async (req, res) => {
        const task = await Task.create(req.body)
        res.status(201).json({task})    
})

const getTask = asyncWrapper( async (req, res, next) => {
    const {id: taskID} = req.params
    const task = await Task.findOne({_id: taskID})
    if(!task){
        const error = new Error('Not found')
        error.status = 404
        return next(error)
    }
    res.status(201).json({task});
})

const updateTask = asyncWrapper( async (req, res) => {
    const { id: taskID } = req.params
    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
        new: true,
        runValidators: true,
        overwrite: true
    })
    if(!task){
        const error = new Error('Not found')
        error.status = 404
        return next(error)
    }
    res.status(200).json({ task })
})

const deleteTask = asyncWrapper( async (req, res) => {
    const {id: taskID} = req.params
    const tasks = await Task.findByIdAndDelete(taskID)
    if(!task){
        const error = new Error('Not found')
        error.status = 404
        return next(error)
    }
    res.status(200).json({tasks: null, status : 'success'})
})

module.exports = {
    getAllTasks,
    createTask,
    updateTask,
    getTask,
    deleteTask
}
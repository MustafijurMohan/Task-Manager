const TaskModel = require('../models/TaskModel')

// Create Task
exports.CreateTask = (req, res) => {
    const reqBody = req.body
    reqBody.email = req.headers['email']

    TaskModel.create(reqBody)
    .then((data) => {
        res.status(200).json({status: 'Successfull', data: data})
    })
    .catch((err) => {
        res.status(400).json({status: 'Fail', data: err})
    })
}

// Update Task By Status
exports.UpdateTaskStatus = (req, res) => {
    const id = req.params.id
    const status = req.params.status
    const Query = {_id : id}
    const reqBody = {status}

    TaskModel.updateOne(Query, reqBody)
    .then((data) => {
        res.status(200).json({status: 'Successfull', data: data})
    })
    .catch((err) => {
        res.status(400).json({status: 'Fail', data: err})
    })
}

// List Task By Status
exports.ListTaskByStatus = (req, res) => {
    const status = req.params.status
    const email = req.headers['email']

    TaskModel.aggregate([
        {$match: {status, email}},
        {$project: {_id: 1, email: 1, title: 1, description: 1, status: 1,
        createDate: {
            $dateToString: {
                date: '$createdDate',
                format: '%d-%m-%Y'
            }
        }
        }}
    ])
    .then((data) => {
        res.status(200).json({status: 'Successfull', data: data})
    })
    .catch((err) => {
        res.status(400).json({status: 'Fail', data: err})
    })
}

// Task Status Count
exports.TaskStatusCount = (req, res) => {
    const email = req.headers['email']

    TaskModel.aggregate([
        {$match: {email: email}},
        {$group: {
            _id: '$status', Sum: {$count: {}}
        }}
    ])
    .then((data) => {
        res.status(200).json({status: 'Successfull', data: data})
    })
    .catch((err) => {
        res.status(400).json({status: 'Fail', data: err})
    })
}

// Task Delete
exports.DeleteTask = (req, res) => {
    const id = req.params.id
    const Query = {_id: id}

    TaskModel.deleteOne(Query)
    .then((data) => {
        res.status(200).json({status: 'Successfull', data: data})
    })
    .catch((err) => {
        res.status(400).json({status: 'Fail', data: err})
    })
}
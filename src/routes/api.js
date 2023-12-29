const express = require('express')
const { registration, login, ProfileDetails, ProfileUpdate, RecoverVerifyEmail, RecoverVerifyOTP, RecoverResetPass } = require('../controllers/UserControllers')
const AuthVerifyMiddleware = require('../middleware/AuthVerifyMiddleware')
const { CreateTask, UpdateTaskStatus, DeleteTask, ListTaskByStatus, TaskStatusCount } = require('../controllers/TaskControllers')
const router = new express.Router()


// User Profile
router.post('/registration', registration)
router.post('/login', login)
router.post('/profile-update', AuthVerifyMiddleware, ProfileUpdate)
router.get('/profile-details', AuthVerifyMiddleware, ProfileDetails)


// Recover Profile
router.get('/recover-verify-email/:email', RecoverVerifyEmail)
router.get('/recover-verify-otp/:email/:otp', RecoverVerifyOTP)
router.post('/recover-reset-pass', RecoverResetPass)

// Task Profile
router.post('/create-task', AuthVerifyMiddleware, CreateTask)
router.get('/update-task-status/:id/:status', AuthVerifyMiddleware, UpdateTaskStatus)
router.get('/list-task-by-status/:status', AuthVerifyMiddleware, ListTaskByStatus)
router.get('/task-status-count', AuthVerifyMiddleware, TaskStatusCount)
router.delete('/delete-task/:id', AuthVerifyMiddleware, DeleteTask)


module.exports = router



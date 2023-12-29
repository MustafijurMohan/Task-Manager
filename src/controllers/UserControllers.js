require('dotenv').config()
const OTPModel = require('../models/OTPModel')
const UserModel = require('../models/UserModel')
const jwt = require('jsonwebtoken')
const SendEmailUtility = require('../utility/SendEmailUtility')
const secret_Key = process.env.TOKEN_KEY


// User Profile Registration
exports.registration = (req, res) => {
    const reqBody = req.body

    UserModel.create(reqBody)
    .then((data) => {
        res.status(200).json({status: 'Successfull', data: data})
    })
    .catch((err) => {
        res.status(200).json({status: 'Fail', data: err})
    })
}

// User Profile Login
exports.login = (req, res) => {
    const reqBody = req.body

    UserModel.aggregate([
        {$match: reqBody},
        {$project: {_id: 0, email: 1, firstName: 1, lastName: 1, mobile: 1, photo: 1}}
    ])
    .then((data) => {
        if (data.length > 0) {
            const payload = {
                exp: Math.floor(Date.now() / 1000 ) + (24 * 60 *60),
                data: data[0]['email']
            }
            const token = jwt.sign(payload, secret_Key)
            res.status(200).json({status: 'Successfull', token: token, data: data[0]})
        } else {
            res.status(401).json({status: 'Unauthorized'})
        }
    })
    .catch((err) => {
        res.status(400).json({status: 'Fail', data: err})
    })
}

// User Profile Details
exports.ProfileDetails = (req, res) => {
    const email = req.headers['email']

    UserModel.aggregate([
        {$match: {email: email}},
        {$project: {_id: 0, email: 1, firstName: 1, lastName: 1, mobile: 1, password: 1, photo: 1}}
    ])
    .then((data) => {
        res.status(200).json({status: 'Successfull', data: data})
    })
    .catch((err) => {
        res.status(400).json({status: 'Fail', data: err})
    })
}

// User Profile Update
exports.ProfileUpdate = (req, res) => {
    const email = req.headers['email']
    const reqBody = req.body

    UserModel.updateOne({email}, reqBody)
    .then((data) => {
        res.status(200).json({status: 'Successfull', data: data})
    })
    .catch((err) => {
        res.status(400).json({status: 'Fail', data: err})
    })
}

// User Recover Verify Email
exports.RecoverVerifyEmail = async (req, res) => {
    let email = req.params.email
    let OTPCode = Math.floor(100000 + Math.random() * 900000)

    try {
        // User Count
        let UserCount = await UserModel.aggregate([{$match: {email: email}}, {$count: 'Total'}])

        if (UserCount.length > 0) {
            // Create OTP
            await OTPModel.create({email: email, otp: OTPCode})
            // Send Email
            let SendEmail = await SendEmailUtility(email, 'Your PIN Code is = ' + OTPCode + ' Task Manager PIN Verification.')
            res.status(200).json({status: 'Successfull', data: SendEmail})
        } else {
            res.status(200).json({status: 'Fail', data: 'No User Found !'})
        }

    } catch (error) {
        res.status(200).json({status: 'Fail', data: error})
    }
}

// User Recover Verify OTP
exports.RecoverVerifyOTP = async (req, res) => {
    let email = req.params.email
    let OTPCode = req.params.otp
    let status = 0
    let statusUpdate = 1

    try {
        // OTP Count
        let OTPCount = await OTPModel.aggregate([{$match: {email: email, otp: OTPCode, status: status}}, {$count: 'Total'}])

        if (OTPCount.length > 0) {
            let OTPUpdate = await OTPModel.updateOne({email: email, otp: OTPCode, status: status}, {email: email, otp: OTPCode, status: statusUpdate})
            res.status(200).json({status: 'Successfull', data: OTPUpdate}) 
        } else {
            res.status(200).json({status: 'Fail', data: 'Invalid OTP Code.'})
        }
    } catch (error) {
        res.status(200).json({status: 'Fail', data: error})
    }
}

// User Recover New Password
exports.RecoverResetPass = async (req, res) => {
    let email = req.body['email']
    let OTPCode = req.body['OTP']
    let NewPass = req.body['password']
    let statusUpdate = 1


    try {
        // OTPUserCount
        let OTPUserCount = await OTPModel.aggregate([{$match: {email: email, otp: OTPCode, status: statusUpdate}}, {$count: 'Total'}])

        if (OTPUserCount.length > 0) {
            let PasswordUpdate = await UserModel.updateOne({email: email}, {password: NewPass})
            res.status(200).json({status: 'Successfull', data: PasswordUpdate})
        } else {
            res.status(200).json({status: 'Fail', data: 'Invalid Request'})
        }
    } catch (error) {
        res.status(200).json({status: 'Fail', data: error})
    }

}
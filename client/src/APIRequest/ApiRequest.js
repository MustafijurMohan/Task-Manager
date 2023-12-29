import axios from 'axios'
import { ErrorToast, SuccessToast } from '../helper/FormHelper'
import store from '../redux/store/store'
import { HideLoader, ShowLoader } from '../redux/state-slice/settings-slice'
import { getToken, setEmail, setOTP, setToken, setUserDetails } from '../helper/SessionHelper'
import { SetCanceledTask, SetCompletedTask, SetNewTask, SetProgressTask } from '../redux/state-slice/task-slice'
import { SetSummery } from '../redux/state-slice/summery-slice'
import { SetProfile } from '../redux/state-slice/profile-slice'


const AxiosHeader = {headers : {'token-key': getToken()}}


// Registration Request

export const RegistrationRequest = (email, firstName, lastName, mobile, password, photo) => {
    store.dispatch(ShowLoader())
    const URL = '/api/v1/registration'
    const PostBody = {email, firstName, lastName, mobile, password, photo}

    return axios.post(URL, PostBody)
        .then((res) => {
            store.dispatch(HideLoader())
            if (res.status === 200) {
                if (res.data['status'] === 'Fail') {
                    if (res.data['data']['keyPattern']['email'] === 1) {
                        ErrorToast('Email Already Exits.')
                        return false
                    } else {
                        ErrorToast('Somethings Went Wrong !')
                        return false
                    }
                } else {
                    SuccessToast('Registration Successfull !')
                    return true
                }
            } else {
                ErrorToast('Somethings Went Wrong !')
                return false
            }
        })
        .catch((err) => {
            store.dispatch(HideLoader())
            ErrorToast('Somethings Went Wrong !')
            console.log(err.message)
            return false
        })
}


// Login Request
export const LoginRequest = (email, password) => {
    store.dispatch(ShowLoader())
    const URL = '/api/v1/login'
    const PostBody = {email, password}

    return axios.post(URL, PostBody)
            .then((res) => {
                store.dispatch(HideLoader())

                if (res.status === 200) {
                    setToken(res.data['token'])
                    setUserDetails(res.data['data'])
                    SuccessToast('Login Successfull.')
                    return true
                } else {
                    ErrorToast('Invalid Email or Password !')
                    return false
                }
            })
            .catch((err) => {
                store.dispatch(HideLoader())
                ErrorToast('Somethings Went Wrong !')
                console.log(err.message)
                return false
            })
}


// Create New Task Request
export const NewTaskRequest = (title, description) => {
    store.dispatch(ShowLoader())
    const URL = '/api/v1/create-task'
    const PostBody = {title, description, status: 'New'}

    return axios.post(URL, PostBody, AxiosHeader)
            .then((res) => {
                store.dispatch(HideLoader())

                if (res.status === 200) {
                    SuccessToast('New Task Created')
                    return true
                } else {
                    ErrorToast('Somethings Went Wrong !')
                    return false
                }
            })
            .catch((err) => {
                store.dispatch(HideLoader())
                ErrorToast('Somethings Went Wrong !')
                console.log(err.message)
                return false
            })
}

// List Task By Status Request
export const TaskListByStatus = (status) => {
    store.dispatch(ShowLoader())
    const URL = '/api/v1/list-task-by-status/'+status

    return axios.get(URL, AxiosHeader)
            .then((res) => {
                store.dispatch(HideLoader())

                if(res.status === 200) {
                    if(status === 'New') {
                        store.dispatch(SetNewTask(res.data['data']))
                    }
                    else if(status === 'Completed') {
                        store.dispatch(SetCompletedTask(res.data['data']))
                    }
                    else if(status === 'Canceled') {
                        store.dispatch(SetCanceledTask(res.data['data']))
                    } 
                    else if(status === 'Progress') {
                        store.dispatch(SetProgressTask(res.data['data']))
                    }


                } else {
                    ErrorToast('Somethings Went Wrong !')
                    return false
                }
            })
            .catch((err) => {
                store.dispatch(HideLoader())
                ErrorToast('Somethings Went Wrong !')
                console.log(err.message)
                return false
            })
}

// Task Summery Request
export const SummeryRequest = () => {
    store.dispatch(ShowLoader())
    const URL = '/api/v1/task-status-count'

    return axios.get(URL, AxiosHeader)
            .then((res) => {
                store.dispatch(HideLoader())
                if(res.status === 200) {
                    store.dispatch(SetSummery(res.data['data']))
                } else {
                    ErrorToast('Somethings Went Wrong !')
                }
            })
            .catch((err) => {
                store.dispatch(HideLoader())
                ErrorToast('Somethings Went Wrong !')
                console.log(err.message)
                return false
            })
}

// Task Delete Request
export const DeleteRequest = (id) => {
    store.dispatch(ShowLoader())

    const URL = '/api/v1/delete-task/' +id

    return axios.delete(URL, AxiosHeader)
            .then((res) => {
                store.dispatch(HideLoader())
                if(res.status === 200) {
                    SuccessToast('Delete Successfull.')
                    return true
                } else {
                    ErrorToast('Somethings Went Wrong !')
                    return false
                }
            })
            .catch((err) => {
                store.dispatch(HideLoader())
                ErrorToast('Somethings Went Wrong !')
                console.log(err.message)
                return false
            })
} 


// Task Status Update Request
export const UpdateStatusRequest = (id, status) => {
    store.dispatch(ShowLoader())

    const URL = '/api/v1/update-task-status/' +id+ '/'+status

    return axios.get(URL, AxiosHeader)
            .then((res) => {
                store.dispatch(HideLoader())
                if(res.status === 200) {
                    SuccessToast('Status Update Successfull.')
                    return true
                } else {
                    ErrorToast('Somethings Went Wrong !')
                    return false
                }
            })
            .catch((err) => {
                store.dispatch(HideLoader())
                ErrorToast('Somethings Went Wrong !')
                console.log(err.message)
                return false
            })
} 

// Profile Details Request
export const GetProfileDetails = () => {
    store.dispatch(ShowLoader())
    const URL = '/api/v1/profile-details'

    return axios.get(URL, AxiosHeader)
            .then((res) => {
                if (res.status === 200) {
                    store.dispatch(SetProfile(res.data['data'][0]))
                    return true
                } else {
                    ErrorToast('Somethings Went Wrong !')
                    return false
                }
            })
            .catch((err) => {
                store.dispatch(HideLoader())
                ErrorToast('Somethings Went Wrong !')
                console.log(err.message)
                return false
            })
}

// Profile Update Request
export const ProfileUpdateRequest = (email, firstName, lastName, mobile, password, photo) => {
    store.dispatch(ShowLoader())
    const URL = '/api/v1/profile-update'
    const PostBody = {email, firstName, lastName, mobile, password, photo}
    const UserDetails = {email, firstName, lastName, mobile, photo}

    return axios.post(URL, PostBody, AxiosHeader)
            .then((res) => {
                store.dispatch(HideLoader())
                if (res.status === 200) {
                    SuccessToast('Profile Update Successfull.')
                    setUserDetails(UserDetails)
                    return true
                } else {
                    ErrorToast('Somethings Went Wrong !')
                    return false
                }
            })
            .catch((err) => {
                store.dispatch(HideLoader())
                ErrorToast('Somethings Went Wrong !')
                console.log(err.message)
                return false
            })
}





// Forget Password Section 1
// Recover Verify Email Request
export const RecoverVerifyEmailRequest = (email) => {
    store.dispatch(ShowLoader())
    const URL = '/api/v1/recover-verify-email/'+email

    return axios.get(URL)
            .then((res) => {
                store.dispatch(HideLoader())

                if (res.status === 200) {
                    if (res.data['status'] === 'Fail') {
                        ErrorToast('No User Found !')
                        return false
                    } else {
                        setEmail(email)
                        SuccessToast('A 6 Digit verification code has been send to your email address.')
                        return true
                    }
                } else {
                    ErrorToast('Somethings Went Wrong !')
                    return false
                }
            })
            .catch((err) => {
                store.dispatch(HideLoader())
                ErrorToast('Somethings Went Wrong !')
                console.log(err.message)
                return false
            })
}

// Forget Password Section 2
// Recover Verify OTP Request
export const RecoverVerifyOTPRequest = (email, OTP) => {
    store.dispatch(ShowLoader())
    const URL = '/api/v1/recover-verify-otp/'+email+'/'+OTP

    return axios.get(URL)
            .then((res) => {
                store.dispatch(HideLoader())
                if (res.status === 200) {
                    if (res.data['status'] === 'Fail') {
                        ErrorToast(res.data['data'])
                        return false
                    } else {
                        setOTP(OTP)
                        SuccessToast('Code Verification Successfull.')
                        return true
                    }
                } else {
                    ErrorToast('Somethings Went Wrong !')
                    return false
                }
            })
            .catch((err) => {
                store.dispatch(HideLoader())
                ErrorToast('Somethings Went Wrong !')
                console.log(err.message)
                return false
            })
}


// Forget Password Section 3
// Recover Verify Reset Password Request
export const RecoverResetPassRequest = (email, OTP, password) => {
    store.dispatch(ShowLoader())
    const URL = '/api/v1/recover-reset-pass'
    const PostBody = {email, OTP, password}

    return axios.post(URL, PostBody)
            .then((res) => {
                store.dispatch(HideLoader())
                if (res.status === 200) {
                    if (res.data['status'] === 'Fail') {
                        ErrorToast(res.data['data'])
                        return false
                    } else {
                        setOTP(OTP)
                        SuccessToast('New Password Created.')
                        return true
                    }
                } else {
                    ErrorToast('Somethings Went Wrong !')
                    return false
                }
            })
            .catch((err) => {
                store.dispatch(HideLoader())
                ErrorToast('Somethings Went Wrong !')
                console.log(err.message)
                return false
            })
}
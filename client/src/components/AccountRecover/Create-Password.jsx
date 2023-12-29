import React, { useRef } from 'react'
import { ErrorToast, IsEmpty } from '../../helper/FormHelper'
import { getEmail, getOTP } from '../../helper/SessionHelper'
import { RecoverResetPassRequest } from '../../APIRequest/ApiRequest'
import { useNavigate } from 'react-router-dom'

const CreatePassword = () => {

let passwordRef, confirmPasswordRef = useRef()
const navigate = useNavigate()


const ResetPass = () => {
    let password = passwordRef.value
    let confirmPassword = confirmPasswordRef.value

    if(IsEmpty(password)) {
        ErrorToast('Password Required.')
    }
    else if(IsEmpty(confirmPassword)) {
        ErrorToast('Confirm Password Required.')
    }
    else if(password !== confirmPassword) {
        ErrorToast('Password & Confirm Password Should be Same.')
    }

    else {
        RecoverResetPassRequest(getEmail(), getOTP(), password)
        .then((res) => {
            if(res) {
                navigate('/login')
            }
        })
    }
}

  return (
    <>
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-7 col-lg-6 center-screen mt-5">
                    <div className="card w-100 p-4">
                        <div className="card-body">
                            <h4>SET NEW PASSWORD</h4>
                            <br />
                            <label htmlFor="">Your Email Address</label>
                            <input readOnly={true} value={getEmail()} type="email" className='form-control animated fadeInUp' placeholder='User Email' />
                            <br />
                            <label htmlFor="">New Password</label>
                            <input ref={(input) => passwordRef=input} type="password" className='form-control animated fadeInUp' placeholder='New Password' />
                            <br />
                            <label htmlFor="">Confirm Password</label>
                            <input ref={(input) => confirmPasswordRef=input} type="password" className='form-control animated fadeInUp' placeholder='Confirm Password' />
                            <br />

                            <button onClick={ResetPass} className='btn btn-primary animated fadeInUp w-100' >Next</button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default CreatePassword
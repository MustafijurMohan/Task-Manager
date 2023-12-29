import React, { useRef } from 'react'
import { ErrorToast, IsEmail } from '../../helper/FormHelper'
import { RecoverVerifyEmailRequest } from '../../APIRequest/ApiRequest'
import { useNavigate } from 'react-router-dom'

const SendOTP = () => {

    let emailRef = useRef()
    const navigate = useNavigate()

    const EmailVerify = () => {
        let email = emailRef.value

        if(IsEmail(email)) {
            ErrorToast('Valid Email Address Required !')
        }
        else {
            RecoverVerifyEmailRequest(email)
            .then((res) => {
                if(res) {
                    navigate('/verifyOTP')
                }
            })
        }
    }

  return (
    <>
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-7 col-lg-6 center-screen">
                    <div className="card w-100 p-4">
                        <div className="card-body">
                            <h4>EMAIL ADDRESS</h4>
                            <br />
                            <label>Your Email Address</label>
                            <input ref={(input) => emailRef=input} type="email" className='form-control animated fadeInUp' placeholder='User Email' />
                            <br />
                            <button onClick={EmailVerify} className='btn btn-primary float-end w-100 animated fadeInUp'>Next</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default SendOTP
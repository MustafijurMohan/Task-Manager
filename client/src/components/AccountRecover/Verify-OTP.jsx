import React, { useState } from 'react'
import ReactCodeInput from 'react-code-input'
import { ErrorToast } from '../../helper/FormHelper'
import { RecoverVerifyOTPRequest } from '../../APIRequest/ApiRequest'
import { getEmail } from '../../helper/SessionHelper'
import { useNavigate } from 'react-router-dom'

const VerifyOTP = () => {

const [OTP, setOTP] = useState('')
   const navigate = useNavigate()

    const defaultInputStyle = {
        fontFamily: "monospace",
        MozAppearance: "textfield",
        margin: "4px",
        paddingLeft: "8px",
        width: "45px",
        borderRadius: '3px',
        height: "45px",
        fontSize: "32px",
        border: '1px solid lightskyblue',
        boxSizing: "border-box",
        color: "black",
        backgroundColor: "white",
        borderColor: "lightgrey"
    }


    const SubmitOTP = () => {
        if(OTP.length === 6) {
            RecoverVerifyOTPRequest(getEmail(), OTP)
            .then((res) => {
                if(res) {
                    navigate('/createPassword')
                }
            })
        } else {
            ErrorToast('Enter 6 Digit Code.')
        }
    }

  return (
    <div>
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-7 col-lg-6 center-screen">
                    <div className="card w-100 p-4">
                        <div className="card-body">
                            <h4>OTP VERIFICATION</h4>
                            <p>A 6 Digit verification code has been send to your email address. </p>
                            <ReactCodeInput onChange={(value) => setOTP(value)} inputStyle={defaultInputStyle} fields={6}/>
                            <button onClick={SubmitOTP} className='btn btn-primary w-100 animated fadeInUp mt-3' >Next</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default VerifyOTP
import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ErrorToast, IsEmail, IsEmpty } from '../../helper/FormHelper'
import { LoginRequest } from '../../APIRequest/ApiRequest'

const Login = () => {

  let emailRef, passwordRef = useRef()

  const SubmitLogin = () => {
    let email = emailRef.value
    let password = passwordRef.value

    if(IsEmail(email)) {
      ErrorToast('Valid Email Address Required')
    }
    else if(IsEmpty(password)) {
      ErrorToast('Password Required')
    }

    else{
        LoginRequest(email, password)
          .then((res) => {
            if(res) {
              window.location.href='/'
            }
          })
    }

  }



  return (
    <>
      <div className="container">
        <div className="row justify-content-center mt-5">
          <div className="col-md-7 col-lg-6 ">
            <div className="card w-100 p-4">
              <div className="card-body">
                <h4>SIGN IN</h4>
                <br />
                <input ref={(input) => emailRef=input} type="email" className='form-control animated fadeInUp' placeholder='User Email' />
                <br />
                <input ref={(input) => passwordRef=input} type="password" className='form-control animated fadeInUp' placeholder='User Password' />
                <br />
                <button onClick={SubmitLogin} className='btn btn-primary w-100 animated fadeInUp fload-end'>Next</button>
                <hr />

                <div className="float-end mt-3">
                  <span>
                    <Link className='text-center ms-3 h6 animated fadeInUp' to='/registration' >Sign Up</Link>
                    <span className='ms-1'> | </span>
                    <Link className='text-center ms-3 h6 animated fadeInUp' to='/sendOTP' >Forget Password</Link>
                  </span>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
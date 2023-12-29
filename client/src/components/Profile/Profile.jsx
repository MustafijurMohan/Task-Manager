import React, { useEffect, useRef } from 'react'
import { GetProfileDetails, ProfileUpdateRequest } from '../../APIRequest/ApiRequest'
import { useSelector } from 'react-redux'
import { ErrorToast, IsEmail, IsEmpty, IsMobile, getBase64 } from '../../helper/FormHelper'
import { useNavigate } from 'react-router-dom'

const Profile = () => {

  let emailRef, firstNameRef, lastNameRef, mobileRef, passwordRef, userImgRef, userImgView = useRef()
  const navigate = useNavigate()

  useEffect(() => {

    GetProfileDetails()

  }, [])
  
  const profileData = useSelector((state) => state.profile.value)

  // Base64 Convert
  const PreviewImg = () => {
      let ImgFile = userImgRef.files[0]
      getBase64(ImgFile)
      .then((base64Img) => {
        userImgView.src = base64Img
      })
  }

  const UpdateMyProfile = () => {
        let email = emailRef.value
        let firstName = firstNameRef.value
        let lastName = lastNameRef.value
        let mobile = mobileRef.value
        let password = passwordRef.value
        let photo = userImgView.src

        if(IsEmail(email)) {
          ErrorToast('Valid Email Address Required !')
        }
        else if(IsEmpty(firstName)) {
          ErrorToast('First Name Required !')
        }
        else if(IsEmpty(lastName)) {
          ErrorToast('Last Name Required !')
        }
        else if(IsMobile(mobile)) {
          ErrorToast('Valid Mobile Required !')
        }
        else if(IsEmpty(password)) {
          ErrorToast('Password Required !')
        }

        else {
          ProfileUpdateRequest(email, firstName, lastName, mobile, password, photo)
          .then((res) => {
            if(res) {
              navigate('/')
            }
          })
        }


  }

  return (
    <>
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <div className="container-fluid">
                  <img ref={(input)=> userImgView=input} className='icon-nav-img-lg  animated fadeInUp' src={profileData['photo']} alt="photo" />
                  <hr />

                  <div className="row">

                    <div className="col-4 p-2">
                      <label htmlFor="">Profile Picture</label>
                      <input onChange={PreviewImg} ref={(input)=> userImgRef=input} type="file" className='form-control animated fadeInUp' />
                    </div>
                    <div className="col-4 p-2">
                      <label htmlFor="">Email Address</label>
                      <input key={Date.now()} defaultValue={profileData['email']} ref={(input)=> emailRef=input} readOnly={true} type="email" className='form-control animated fadeInUp' placeholder='User Email'/>
                    </div>
                    <div className="col-4 p-2">
                      <label htmlFor="">First Name</label>
                      <input key={Date.now()} defaultValue={profileData['firstName']} ref={(input)=> firstNameRef=input} type="text" className='form-control animated fadeInUp' placeholder='First Name'/>
                    </div>
                    <div className="col-4 p-2">
                      <label htmlFor="">Last Name</label>
                      <input key={Date.now()} defaultValue={profileData['lastName']} ref={(input)=> lastNameRef=input} type="text" className='form-control animated fadeInUp' placeholder='Last Name'/>
                    </div>
                    <div className="col-4 p-2">
                      <label htmlFor="">Mobile</label>
                      <input key={Date.now()} defaultValue={profileData['mobile']} ref={(input)=> mobileRef=input} type="mobile" className='form-control animated fadeInUp' placeholder='Mobile Number'/>
                    </div>
                    <div className="col-4 p-2">
                      <label htmlFor="">Password</label>
                      <input key={Date.now()} defaultValue={profileData['password']} ref={(input)=> passwordRef=input} type="password" className='form-control animated fadeInUp' placeholder='Password'/>
                    </div>
                    
                    <div className="col-md-4 p-2">
                      <button onClick={UpdateMyProfile} className='btn btn-primary float-end w-100 animated fadeInUp' >Update</button>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile
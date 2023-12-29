import React, { useRef } from 'react'
import { Container, Row } from 'react-bootstrap'
import { ErrorToast, IsEmpty } from '../../helper/FormHelper'
import { NewTaskRequest } from '../../APIRequest/ApiRequest'
import { useNavigate } from 'react-router-dom'

const Create = () => {

  let titleRef, descriptionRef = useRef()
  const navigate = useNavigate()


  const CreateNew = () => {
    let title = titleRef.value
    let description = descriptionRef.value

    if(IsEmpty(title)) {
      ErrorToast('Title Required !')
    }
    else if(IsEmpty(description)) {
      ErrorToast('Description Required !')
    }

    else {
        NewTaskRequest(title, description)
        .then((res) => {
          if(res) {
            navigate('/all')
          }
        })
    }

  }

  return (
    <>
      <Container fluid={true} className='content-body'>
        <Row className='d-flex justify-content-center'>
          <div className="col-12 col-lg-10 col-sm-12 col-md-8 p-2">
            <div className="card">
              <div className="card-body">
                <h4>Create New</h4>
                <br />
                <input ref={(input) => titleRef=input} type="text" className='form-control animated fadeInUp' placeholder='Task Name' />
                <br />
                <textarea ref={(input) => descriptionRef=input}  className='form-control animated fadeInUp' rows='5' placeholder='Task Description'></textarea>
                <br />
                <button onClick={CreateNew} className='btn btn-primary float-end animated fadeInUp'>Create</button>
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </>
  )
}

export default Create
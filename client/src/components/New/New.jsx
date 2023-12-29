import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { AiOutlineCalendar, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { TaskListByStatus } from '../../APIRequest/ApiRequest';
import { useSelector } from 'react-redux';
import { DeleteTodo } from '../../helper/DeleteAlert';
import { useNavigate } from 'react-router-dom';
import { UpdateTodo } from '../../helper/UpdateAlert';


const New = () => {

  useEffect(() => {
    TaskListByStatus('New')
  }, [])
  
  const NewList = useSelector((state) => state.task.New)


  // Delete Task
  const DeleteItem = (id) => {
    DeleteTodo(id)
    .then((res) => {
      if(res === true) {
        TaskListByStatus('New')
      }
    })
  }

  // Status Update

  const StatusChangeItem = (id, status) => {
    UpdateTodo(id, status)
    .then((res) => {
      if(res === true) {
          TaskListByStatus('New')
          window.location.reload()
      }
    })
  }

  return (
    <>
      <Container fluid={true} className='content-body'>
        <div className="row p-0 m-0">
          <div className="col-12 col-md-6 col-lg-8 px-3">
            <h5>New Task</h5>
          </div>
          <div className="col-12 col-md-6 col-lg-4 px-2 float-end">
            <div className="row">
              <div className="col-8">
                <input type="text" className='form-control w-100' />
              </div>
              <div className="col-4">
                <button className='btn btn-primary w-100 ' >Search</button>
              </div>
            </div>
          </div>
        </div>


        <div className="row m-0 p-0">
          {NewList.map((item, i) => 
            <div key={i.toString()} className="col-12 col-lg-4 col-sm-6 col-md-4 p-2 ">
              <div className="card h-100">
                <div className="card-body">
                  <h6 className='animated fadeInUp'>{item.title}</h6>
                  <p className='animated fadeInUp'>{item.description}</p>
                  <p className='p-0 m-0 animated fadeInUp' >
                    <AiOutlineCalendar /> {item.createDate}
                    <a onClick={StatusChangeItem.bind(this, item._id, item.status)} className='icon-nav text-primary mx-1' ><AiOutlineEdit /></a>
                    <a onClick={DeleteItem.bind(this,item._id)} className='icon-nav text-danger mx-1' ><AiOutlineDelete /></a>
                    <a className='badge bg-info float-end' >{item.status}</a>
                  </p>
                </div>
              </div>
            </div>
          )}
          
        </div>
      </Container>
    </>
  )
}

export default New
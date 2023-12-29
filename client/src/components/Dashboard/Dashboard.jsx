import React, { useEffect } from 'react'
import { SummeryRequest } from '../../APIRequest/ApiRequest'
import { useSelector } from 'react-redux'

const Dashboard = () => {

  useEffect(() => {
    SummeryRequest()
  }, [])
  
  const SummeryList = useSelector((state) => state.summery.value)

  return (
    <>
      <div className="container">
        <div className="row">
        {SummeryList.map((item, i) => 
          <div key={i.toString()} className="col-12 col-lg-3 col-sm-6 col-md-3 p-2">
            <div className="card">
              <div className="card-body">
                <h5 className='animated fadeInUp'>Total {item._id}</h5>
                <h6 className='text-secondary animated fadeInUp'>{item.Sum}</h6>
              </div>
            </div>
          </div>
        )}

        </div>
      </div>
    </>
  )
}

export default Dashboard
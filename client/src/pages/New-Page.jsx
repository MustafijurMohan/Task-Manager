import React, { Suspense, lazy } from 'react'
import MasterLayout from '../components/masterLayout/Master-Layout'
import LazyLoader from '../components/masterLayout/LazyLoader'

const New = lazy(() => import('../components/New/New'))
const NewPage = () => {
  return (
    <>
      <MasterLayout>
          <Suspense fallback={<LazyLoader />}>
            <New />
          </Suspense>
        </MasterLayout>
    </>
  )
}

export default NewPage
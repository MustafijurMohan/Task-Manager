import React, { Suspense, lazy } from 'react'
import MasterLayout from '../components/masterLayout/Master-Layout'
import LazyLoader from '../components/masterLayout/LazyLoader'

const Canceled = lazy(() => import('../components/Canceled/Canceled'))

const CanceledPage = () => {
  return (
    <>
      <MasterLayout>
          <Suspense fallback={<LazyLoader />}>
            <Canceled />
          </Suspense>
        </MasterLayout>
    </>
  )
}

export default CanceledPage
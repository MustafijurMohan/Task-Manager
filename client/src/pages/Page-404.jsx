import React, { Suspense, lazy } from 'react'
import MasterLayout from '../components/masterLayout/Master-Layout'
import LazyLoader from '../components/masterLayout/LazyLoader'

const NotFound = lazy(() => import('../components/NotFound/NotFound'))

const Page404 = () => {
  return (
    <>
      <MasterLayout>
          <Suspense fallback={<LazyLoader />}>
            <NotFound />
          </Suspense>
        </MasterLayout>
    </>
  )
}

export default Page404
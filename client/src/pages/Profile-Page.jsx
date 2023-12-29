import React, { Suspense, lazy } from 'react'
import MasterLayout from '../components/masterLayout/Master-Layout'
import LazyLoader from '../components/masterLayout/LazyLoader'

const Profile = lazy(() => import('../components/Profile/Profile'))

const ProfilePage = () => {
  return (
    <>
      <MasterLayout>
          <Suspense fallback={<LazyLoader />}>
            <Profile />
          </Suspense>
        </MasterLayout>
    </>
  )
}

export default ProfilePage
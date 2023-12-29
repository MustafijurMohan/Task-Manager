import React, { Suspense, lazy } from 'react'
import LazyLoader from '../../components/masterLayout/LazyLoader'
const VerifyOTP = lazy(() => import('../../components/AccountRecover/Verify-OTP'))

const VerifyOTPPage = () => {
  return (
    <>
        <Suspense fallback={<LazyLoader />}>
            <VerifyOTP />
        </Suspense>
    </>
  )
}

export default VerifyOTPPage
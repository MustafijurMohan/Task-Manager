import { BrowserRouter as Router, Routes, Route, Navigate  } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
// import './App.css'
import Dashboard from './pages/Dashboard-Page'
import FullscreenLoader from './components/masterLayout/Fullscreen-Loader'
import LoginPage from './pages/Login-Page'
import RegistrationPage from './pages/Registration-Page'
import CreatePage from './pages/Create-Page'
import NewPage from './pages/New-Page'
import CanceledPage from './pages/Canceled-Page'
import CompletedPage from './pages/Completed-Page'
import ProgressPage from './pages/Progress-Page'
import { getToken } from './helper/SessionHelper';
import ProfilePage from './pages/Profile-Page';
import Page404 from './pages/Page-404';
import SendOTPPage from './pages/AccountRecover/Send-OTP-Page';
import VerifyOTPPage from './pages/AccountRecover/Verify-OTP-Page';
import CreatePasswordPage from './pages/AccountRecover/Create-Password-Page';

const App = () => {

  if (getToken()) {
    return (
      <>
      <Router>
        <ToastContainer />
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/create' element={<CreatePage />} />
          <Route path='/all' element={<NewPage />} />
          <Route path='/canceled' element={<CanceledPage />} />
          <Route path='/completed' element={<CompletedPage />} />
          <Route path='/progress' element={<ProgressPage />} />
          <Route path='/profile' element={<ProfilePage />} />

          <Route path='*' element={<Page404/>} />
        </Routes>
      </Router>
      <FullscreenLoader />
      
      </>
    )
  } else {
    return (
      <>
      <Router>
        <ToastContainer />
        <Routes>
          <Route path='/' element={<Navigate to='/login' replace />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/registration' element={<RegistrationPage />} />

          <Route path='/sendOTP' element={<SendOTPPage />} />
          <Route path='/verifyOTP' element={<VerifyOTPPage />} />
          <Route path='/createPassword' element={<CreatePasswordPage />} />

          <Route path='*' element={<Page404 />} />
        </Routes>
      </Router>
      
      <FullscreenLoader />
      </>
    )
  }
}

export default App

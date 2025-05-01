import React, { Suspense, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { getProfile } from './redux/thunks/userThunk'
import { RoleRoutes, UserRoutes } from './auth/ProtectedRoute'
import { ToastContainer } from 'react-toastify'
import useSocket from './SocketContext'

export default function App () {
  const { user, loading } = useSelector(s => s.auth)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getProfile())
  }, [])
  const LoginPage = React.lazy(() => import('./pages/Login'))
  const RegisterPage = React.lazy(() => import('./pages/Register'))
  const HomePage = React.lazy(() => import('./pages/Home'))

  // Dcotor routes
  const DoctorHome = React.lazy(() => import('./view/doctor/Home'));
  const DoctorAppointMent = React.lazy(() => import('./view/doctor/Appointments'));
  const DoctorHistory = React.lazy(() => import('./view/doctor/History'));
  const DoctorPatient = React.lazy(() => import('./view/doctor/patients'))

  // Dcotor routes
  const CareHome = React.lazy(() => import('./view/caregiver/Home'));
  const CareAppointments = React.lazy(() => import('./view/caregiver/Appointments'));
  const CareHistory = React.lazy(() => import('./view/caregiver/History'));
  // Dcotor routes
  const FamilyHome = React.lazy(() => import('./view/family/Home'));
  const FamilyAppointments = React.lazy(() => import('./view/family/Appointments'));
  const FamilyElderly =  React.lazy(() => import('./view/family/Elderly'));
  const FamilyConsult = React.lazy(() => import('./view/family/Consult'));
  const FamilyHistory = React.lazy(() => import('./view/family/History'))
  return loading ? (
    <div className='flex justify-center items-center bg-black h-screen'>
      <div className='loader2'></div>
    </div>
  ) : (
    <Suspense
      fallback={
        <div className='flex justify-center items-center h-screen w-screen bg-white'>
          <div className='loading'></div>
        </div>
      }
    >
      <BrowserRouter>
        <Routes>
          <Route element={<UserRoutes />}>
            <Route path='/' element={<HomePage/>} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
          </Route>

          <Route path='/doctor' element={<RoleRoutes requiredRole={"doctor"} ></RoleRoutes>}>
            <Route index element={<DoctorHome/>} />
            <Route path='appointments' element={<DoctorAppointMent/>}/>
            <Route path='history' element={<DoctorHistory/>}/>
            <Route path='patients' element={<DoctorPatient/>}/>
          </Route>
    
          <Route path='/caregiver' element={<RoleRoutes requiredRole={"caregiver"} ></RoleRoutes>}>
            <Route index element={<CareHome/>} />
            <Route path='appointments' element={<CareAppointments/>}  />
            <Route path='history' element={<CareHistory/>} />
          </Route>
          <Route path='/family' element={<RoleRoutes requiredRole={"family"} ></RoleRoutes>}>
            <Route index element={<FamilyHome/>} />
            <Route path='appointments' element={<FamilyAppointments/>} />
            <Route path='elderly' element={<FamilyElderly/>} />
            <Route path='consult' element={<FamilyConsult/>} />
            <Route path='history' element={<FamilyHistory/>} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} pauseOnHover />
    </Suspense>
  )
}

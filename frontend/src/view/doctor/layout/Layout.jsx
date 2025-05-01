import React from 'react'
import Header from '../../../components/Header'
import Sidebar from '../../../components/Sidebar'
import { APPOINTMENTS ,DASHBOARD,PROFILE,TIMER} from '../../../icons/HeaderIcons'

const Layout = WrappedComponent => {
  return function LayoutComponent (props) {

    const NAV_ITEMS = [
           {label:"Dashboard" , Icon:<DASHBOARD/> , path:'/doctor'},
        { label: 'Apointments',Icon:<APPOINTMENTS/> , path: '/doctor/appointments' },
        { label: 'Patient History',Icon:<TIMER/> ,path: '/doctor/history' },
        { label: 'Patients',Icon:<PROFILE/>, path: '/doctor/patients' }
      ]
    return (
      <>
        <Sidebar NAV_ITEMS={NAV_ITEMS} />
        <main className='ml-[230px] w-[calc(100vw-230px)]'>
          <Header />
          <WrappedComponent {...props} />
        </main>
      </>
    )
  }
}

export default Layout

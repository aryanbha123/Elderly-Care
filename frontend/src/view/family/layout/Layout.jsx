import React from 'react'
import Header from '../../../components/Header'
import Sidebar from '../../../components/Sidebar'
import { APPOINTMENTS ,DASHBOARD,PROFILE,TIMER} from '../../../icons/HeaderIcons'

const Layout = WrappedComponent => {
  return function LayoutComponent (props) {

    const NAV_ITEMS = [
      {label:"Dashboard" , Icon:<DASHBOARD/> , path:'/family'},
        { label: 'Book Caretakers',Icon:<APPOINTMENTS/> , path: '/family/appointments' },
        { label: 'Manage Elderly',Icon:<TIMER/> ,path: '/family/elderly' },
        { label: 'Consult Doctor',Icon:<PROFILE/>, path: '/family/consult' },
        { label: 'History',Icon:<TIMER/>, path: '/family/history' }
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

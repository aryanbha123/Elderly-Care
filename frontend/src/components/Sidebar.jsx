import React from 'react'
import { SIDEBAR_ICON } from '../icons/HeaderIcons'
import { Link } from 'react-router-dom'

export default function Sidebar ({NAV_ITEMS}) {

  return (
    <>
      <aside className='flex flex-col h-screen text-white fixed top-0 left-0 bg-neutral-900 w-[230px]'>
        <div className='flex w-full justify-between p-4 cursor-pointer'>
            <span className='text-sm'>Dashboard</span>
            <SIDEBAR_ICON/>
        </div>
        <div className='mt-10 px-6 text-black flex flex-col gap-4'>
            {NAV_ITEMS.map((i,idx) => (
                <Link to={i.path} className='bg-gray-300 flex items-center gap-3 cursor-pointer rounded-2xl text-xs p-3'>
                    {i.Icon}{i.label}
                </Link>
            ))}
        </div>
      </aside>
    </>
  )
}
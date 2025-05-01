import { Avatar, IconButton } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { Logout } from '../config'
import {Logout as LogoutIcon} from '@mui/icons-material'
export default function Header() {
    const {user } =  useSelector(s=>s.auth)
  return (
    <>
        <header className='z-40 fixed items-center top-0 px-4 justify-between w-[calc(100vw-230px)] flex bg-white shadow-md h-[60px]'>
            <span>Hello {user.name}</span>
            <div className='flex gap-3 items-center'>
                <IconButton onClick={Logout}>

                <LogoutIcon/>
                </IconButton>
                
                <Avatar/>
            </div>
        </header>
    </>
  )
}

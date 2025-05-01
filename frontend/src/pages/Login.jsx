import React, { useState } from 'react'
import { Button } from '@mui/material'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { setUser } from '../redux/userSlice'

const Login = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async e => {
    setLoading(true)
    e.preventDefault()
    try {
      const res = await axios.post(
        'http://localhost:3001/api/auth/login',
        formData,
        {
          withCredentials: true
        }
      )
      toast.success('Login successful!') // side se grreen aara 

      sessionStorage.setItem('token', res.data.token)
      dispatch(setUser(res.data.user))
    } catch (err) {
      toast.error('Login failed!')
      console.error(err.response?.data || err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <form
        onSubmit={handleSubmit}
        className='bg-white p-8 rounded-lg shadow-md w-full max-w-md'
      >
        <h2 className='text-2xl font-semibold text-gray-800 mb-6 text-center'>
          Login
        </h2>

        <input
          name='email'
          type='email'
          placeholder='Email'
          onChange={handleChange}
          required
          className='w-full mb-5 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow'
        />

        <input
          name='password'
          type='password'
          placeholder='Password'
          onChange={handleChange}
          required
          className='w-full mb-5  bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow'
        />

        <Button
          type='submit'
          variant='contained'
          fullWidth
          sx={{
            fontSize: 11
          }}
        >
          Login
        </Button>
      </form>
      {loading && (
        <div className='fixed z-50 h-screen w-screen  flex justify-center backdrop-blur-xs items-center'>
          <div className='loader'></div>
        </div>
      )}
    </div>
  )
}

export default Login

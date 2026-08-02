import React, { useEffect } from 'react'
import Sidebar from '../../components/SideBar'
import { Outlet, useNavigate } from 'react-router-dom'

function Main() {

  const navigate = useNavigate()

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token'))
    if (!token) return navigate('/')
  }, [navigate])

  return (
    <div className="flex h-screen bg-zinc-800">
      <Sidebar />

      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default Main

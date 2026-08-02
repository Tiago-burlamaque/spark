import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Login from './pages/Login/index.jsx'
import Cadastro from './pages/Cadastro/index.jsx'
import Main from './layout/Main/index.jsx'
import Feed from './pages/Feed/index.jsx'

const router = createBrowserRouter([
  { path: '/', element: <Login /> },
  { path: '/cadastro', element: < Cadastro /> },
  {
    element: <Main />, children: [
      { path: '/feed', element: <Feed /> }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
    <Toaster
      position="top-right"
      reverseOrder={false}
      toastOptions={{
        duration: 3000,
        removeDelay: 1000,
        style: {
          background: '#363636',
          color: '#fff'
        },
        success: {
          duration: 3000,
          iconTheme: {
            primary: 'green',
            secondary: '#363636',
          },
        },
        error: {
          duration: 3000,
          iconTheme: {
            primary: 'red',
            secondary: '#363636'
          }
        }
      }}
    />
  </StrictMode>,
)

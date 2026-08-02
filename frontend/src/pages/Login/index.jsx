import React, { useEffect, useState } from 'react'
import { CiUser } from "react-icons/ci";
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Link } from 'react-router-dom'
import { login } from '../../services/auth.service';
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';

function Login() {

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token'))
    if (token) return navigate('/feed')
  }, [])

  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      await login({
        email: email,
        senha: senha
      })

      toast.success('Usuário logado com sucesso.')

      setTimeout(() => {
        navigate('/feed')
      }, 2000)

    } catch (error) {
      if (error.status === 401) {
        toast.error('E-mail ou senha inválido.')
      }

      if (error.status === 500) {
        toast.error('Erro interno no servidor.')
      }

      if (error.status === 400) {
        toast.error('Os campos são obrigatórios.')
      }

      if (error.status === 404) {
        toast.error('Rota não encontrada.')
      }

      console.log(error)
    }
  }

  return (
    <section className='h-screen bg-linear-to-r from-10% from-violet-950 to-80% to-violet-700  text-white flex flex-col items-center justify-center'>


      <div className='
 w-100
 h-120
 rounded
 border
 backdrop-blur-lg
 border-violet-800/50
 shadow-2xl'>

        <CiUser className='absolute -top-15 flex border-2 px-2 rounded-full shadow-lg text-white shadow-white right-38 text-8xl backdrop-blur-lg' />

        <header className=' h-25 text-3xl items-end flex justify-center'>
          <h1 className='poppins-extrabold'>
            Login
          </h1>
        </header>

        <form className='
        w-full  
        flex
        flex-col
        justify-center
        p-6
        gap-4
        '
          onSubmit={handleLogin}>
          <div className='flex flex-col gap-2 '>
            <Input
              label="E-mail"
              type='email'
              value={email}
              onchange={(e) => setEmail(e.target.value)}
              required />
          </div>

          <div className='flex flex-col gap-2 '>
            <Input
              label="Senha"
              type="password"
              value={senha}
              onchange={(e) => setSenha(e.target.value)} />
          </div>

          <Button type='submit'>
            Entrar
          </Button>

          <div className='w-full h-10 px-1'>
            <h2 className='poppins-bold'>
              Não tem uma conta? <Link className='text-violet-200 hover:text-violet-400 transition-colors duration-300 poppins-extrabold' to='/cadastro'>Cadastre-se</Link>
            </h2>
          </div>
        </form>
      </div>
    </section>
  )
}

export default Login

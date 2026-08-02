import React, { useState } from 'react'
import { CiUser } from "react-icons/ci";
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Link, useNavigate } from 'react-router-dom'
import { cadastro } from '../../services/auth.service';
import { toast } from 'react-hot-toast'

function Cadastro() {

  const [username, setUsername] = useState('')
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token'))
    if (token) return navigate('/feed')
  }, [])

  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()

    try {
      await cadastro({
        username: username,
        nome: nome,
        email: email,
        senha: senha
      })

      toast.success('Usuário cadastrado com sucesso.')

      navigate('/')
    } catch (error) {
      if (error.status === 409) {
        toast.error('E-mail já cadastrado.')
      }

      if (error.status === 500) {
        toast.error('Erro interno no servidor.')
        console.log(error)
      }
    }
  }

  return (
    <section className='h-screen bg-linear-to-r from-10% from-violet-950 to-80% to-violet-700  text-white flex flex-col items-center justify-center'>


      <div className='
       w-100
       h-160
       rounded
       border
       backdrop-blur-lg
       border-violet-800/50
       shadow-2xl'>


        <header className=' h-20 text-3xl items-end flex justify-center'>
          <h1 className='poppins-extrabold'>
            Cadastro
          </h1>
        </header>

        <form className='
        w-full  
        flex
        flex-col
        justify-center
        p-6
        gap-4
        ' onSubmit={handleRegister}>
          <div className='flex flex-col gap-2 '>
            <Input
              label="Username"
              type='text'
              value={username}
              onchange={(e) => setUsername(e.target.value)} />
          </div>

          <div className='flex flex-col gap-2 '>
            <Input
              label="Nome"
              type='text'
              value={nome}
              onchange={(e) => setNome(e.target.value)} />
          </div>

          <div className='flex flex-col gap-2 '>
            <Input
              label="E-mail"
              type='email'
              value={email}
              onchange={(e) => setEmail(e.target.value)} />
          </div>

          <div className='flex flex-col gap-2 '>
            <Input
              label="Senha"
              type="password"
              value={senha}
              onchange={(e) => setSenha(e.target.value)} />
          </div>

          <Button type='submit'>
            Cadastrar
          </Button>

          <div className='w-full h-10 px-1'>
            <h2 className='poppins-bold'>
              Já tem uma conta? <Link className='text-violet-200 hover:text-violet-400 transition-colors duration-300 poppins-extrabold' to='/'>Entre</Link>
            </h2>
          </div>
        </form>
      </div>
    </section>
  )
}

export default Cadastro

import { authRepository } from "../repository/authRepository";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

class LoginService {
    validarCampos(email: string, senha: string) {
        if (!email) return { success: false, message: "O campo E-mail é obrigatório." }
        if (!senha) return { success: false, message: "O campo senha é obrigatório." }
    }

    async verificarExisteEmail(email: string) {
        const user = await authRepository.findEmail(email)

        if (!user) return { success: false, message: "E-mail não encontrado." }
    }

    async validarSenha(email: string, senha: string) {
        const user = await authRepository.findEmail(email)

        if (!user) return { success: false, message: "E-mail não encontrado." }

        const senhaValida = await bcrypt.compare(
            senha,
            user?.senha
        )

        if (!senhaValida) return { success: false, message: "E-mail ou senha inválidos" }
    }

    async gerarToken(email: string) {
        const user = await authRepository.findEmail(email)

        if (!user) return { success: false, message: "E-mail não encontrado." }

        const token = jwt.sign(
            {
                id: user.id,
                nome: user.nome,
                username: user.username,
                email: user.email
            },
            process.env.JWT_SECRET!,
            { expiresIn: "1d" }
        )

        return token


    }
}

export const loginService = new LoginService()
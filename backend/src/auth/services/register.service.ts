import { authRepository } from "../repository/authRepository";
import bcrypt from 'bcrypt'


export class RegisterService {

    limite(senha: string) {
        if (senha.length < 8) return { success: false, message: "O campo senha deve ser maior ou igual a 8." }
    }

    async verificarEmail(email: string) {
        const existe = await authRepository.findEmail(email);

        if (existe) return { sucesso: false, message: "E-mail já cadastrado." }
    }

    validarCampos(username: string, nome: string, email: string, senha: string) {
        if (!username) return { success: false, message: "O campo username é obrigatório." }
        if (!nome) return { success: false, message: "O campo nome é obrigatório." }
        if (!email) return { success: false, message: "O campo e-mail é obrigatório." }
        if (!senha) return { success: false, message: "O campo senha é obrigatório." }
    }

    async criar(username: string, nome: string, email: string, senha: string) {
        const salts = 10;
        const hashSenha = await bcrypt.hash(senha, salts);
        return await authRepository.create(username, nome, email, hashSenha)
    }
}

export const registerService = new RegisterService()
import { prisma } from "../../../lib/prisma"

export class AuthRepository {
    // Quem instanciar esta classe terá que passar o prisma criado pela lib

    async create(username: string, nome: string, email: string, senha: string) {
        return await prisma.usuario.create({
            data: {
                username: username,
                nome: nome,
                email: email,
                senha: senha
            }
        })
    }

    async findEmail(email: string) {
        return await prisma.usuario.findUnique({
            where: {
                email: email
            }
        })
    }
}

export const authRepository = new AuthRepository()
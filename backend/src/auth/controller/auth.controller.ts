import { loginService } from "../services/login.service";
import { registerService } from "../services/register.service";
import { Request, Response } from 'express'

interface UsuarioDTO {
    username: string
    nome: string
    email: string
    senha: string
}

export class AuthController {

    async login(req: Request, res: Response) {
        try {
            const { email, senha } = req.body as UsuarioDTO

            const campos = loginService.validarCampos(email, senha)

            if (campos) return res.status(400).json(campos.message)

            const user = await loginService.verificarExisteEmail(email)

            if (user?.success == false) return res.status(401).json(user.message)

            const senhaValida = await loginService.validarSenha(email, senha)

            if (senhaValida?.success == false) return res.status(401).json(senhaValida.message)

            const token = await loginService.gerarToken(email)

            return res.status(200).json({
                message: "Usuário logado com sucesso.",
                token
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                message: "Erro interno no servidor."
            })
        }
    }

    async register(req: Request, res: Response) {
        try {

            const { username, nome, email, senha } = req.body as UsuarioDTO

            const campos = registerService.validarCampos(
                username,
                nome,
                email,
                senha
            );

            if (campos) return res.status(400).json(campos.message);

            const emailExiste = await registerService.verificarEmail(email);

            if (emailExiste) return res.status(409).json("E-mail já cadastrado.");

            const limite = await registerService.limite(senha)

            if (limite?.success == false) return res.status(400).json(limite.message)

            const user = await registerService.criar(
                username,
                nome,
                email,
                senha
            );

            return res.status(201).json({
                message: "Usuário cadastrado com sucesso.",
                user
            });
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                message: "Erro interno no servidor."
            })
        }
    }
}

export const authController = new AuthController()
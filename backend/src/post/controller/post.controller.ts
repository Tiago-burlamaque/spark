import { Request, response, Response } from "express";
import { createPost } from '../services/createPost.service'
import { readPostService } from "../services/readPost.service";
import { deletePostService } from "../services/deletePost.service";
import { updatePostService } from "../services/updatePost.service";

interface PostDTO {
    conteudo: string
    imagem: string
    usuarioId: number
}

class PostController {
    async criar(req: Request, res: Response) {
        try {
            const { conteudo } = req.body;

            const imagem = req.file?.filename ?? null;

            const usuarioId = req.user.id;

            const campos = createPost.validarCampos(conteudo)

            if (campos?.success == false) return res.status(400).json(campos.message)

            const limite = createPost.limte(conteudo)

            if (limite?.success == false) return res.status(400).json(limite.message)

            const post = await createPost.criar(
                conteudo,
                imagem,
                usuarioId
            );
            return res.status(201).json({
                message: "Post criado com sucesso.",
                post
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                message: "Erro interno no servidor."
            })
        }
    }

    async pegarPorId(req: Request, res: Response) {
        try {
            const id = Number(req.params.id)

            const post = await readPostService.pegarPorId(id)

            if ("success" in post) {
                return res.status(404).json({
                    message: post.message
                })
            }

            return res.status(200).json(post)

        } catch (error) {
            return res.status(500).json({
                message: "Erro interno do servidor."
            })
        }
    }

    async pegarTodos(req: Request, res: Response) {
        try {
            const post = await readPostService.pegarTodos()

            if ("success" in post) return res.status(404).json({
                message: post.message
            })

            return res.status(200).json(post)
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                message: "erro interno no servidor."
            })
        }
    }

    async deletar(req: Request, res: Response) {
        try {
            const id = Number(req.params.id)

            const post = await deletePostService.deletar(id)

            if ("success" in post) return res.status(404).json({
                message: post.message
            })

            return res.status(200).json({
                message: "Post deletado com sucesso."
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                message: "Erro interno no servidor."
            })
        }
    }

    async atualizar(req: Request, res: Response) {
        try {
            const id = Number(req.params.id)

            const { conteudo, imagem } = req.body as PostDTO

            const campo = updatePostService.validarCampo(conteudo)

            if (campo?.success == false) return res.status(400).json(campo.message)

            const post = await updatePostService.atualizar(conteudo, imagem, id)

            return res.status(200).json({
                post
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                message: "Erro interno no servidor."
            })
        }
    }
}


export const postController = new PostController()
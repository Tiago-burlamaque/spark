import { postRepository } from "../repository/postRepository";

class CreatePostService {
    validarCampos(conteudo: string) {
        if (!conteudo) return { success: false, message: "O campo conteúdo é obrigatório." }
    }


    limte(conteudo: string) {
        if (conteudo.length > 1500) return { success: false, message: "O conteúdo deve ter até 1500 caracteres." }
    }

    async criar(
        conteudo: string,
        imagem: string | null,
        usuarioId: number
    ) {
        return postRepository.create(conteudo, imagem, usuarioId);
    }
}

export const createPost = new CreatePostService()
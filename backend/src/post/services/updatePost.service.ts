import { postRepository } from "../repository/postRepository";

class UpdatePostService {
    validarCampo(conteudo: string) {
        if (!conteudo) return { success: false, message: "Edite pelo menos o conteúdo." }
    }

    async atualizar(conteudo: string, imagem: string, id: number) {
        return await postRepository.update(id, conteudo, imagem)
    }
}

export const updatePostService = new UpdatePostService()
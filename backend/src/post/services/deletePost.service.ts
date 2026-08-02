import { postRepository } from "../repository/postRepository";

class DeletePostService {
    async deletar(id: number) {
        const post = await postRepository.getAll()

        if (post.length === 0) return { success: false, message: "Nenhum post foi encontrado." }

        return await postRepository.delete(id)
    }
}

export const deletePostService = new DeletePostService()
import { postRepository } from "../repository/postRepository";

class ReadPostService {

    async pegarTodos() {
        const post = await postRepository.getAll()

        if (post.length === 0) return { success: false, message: "Nenhum post foi encontrado." }

        return post
    }

    async pegarPorId(id: number) {
        const post = await postRepository.getById(id)

        if (!post) return { success: false, message: "Nenhum post foi encontrado." }

        return post
    }
}

export const readPostService = new ReadPostService()
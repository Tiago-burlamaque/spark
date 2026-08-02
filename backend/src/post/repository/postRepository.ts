import { prisma } from '../../../lib/prisma'

class PostRepository {
    create(
        conteudo: string,
        imagem: string | null,
        usuarioId: number
    ) {
        return prisma.post.create({
            data: {
                conteudo,
                imagem,
                usuario: {
                    connect: {
                        id: usuarioId,
                    },
                },
            },
        });
    }

    getAll() {
        return prisma.post.findMany()
    }

    getById(id: number) {
        return prisma.post.findUnique({
            where: {
                id: id
            }
        })
    }

    update(id: number, conteudo: string, imagem: string) {
        return prisma.post.update({
            where: {
                id: id
            },
            data: {
                conteudo: conteudo,
                imagem: imagem
            }
        })
    }

    delete(id: number) {
        return prisma.post.delete({
            where: {
                id: id
            }
        })
    }
}

export const postRepository = new PostRepository()
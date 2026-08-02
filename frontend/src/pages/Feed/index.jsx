import React, { useEffect, useState } from "react";
import Posts from "../../components/Posts";
import { criarPost, pegarTodosPosts } from "../../services/post.service";
import Seguidores from "../../components/Seguidores";
import Button from "../../components/Button/index";
import { toast } from "react-hot-toast";

function Feed() {
    const [posts, setPosts] = useState([]);
    const [modalEnviar, setModalEnviar] = useState(false);

    const [conteudo, setConteudo] = useState("");
    const [imagem, setImagem] = useState(null);

    const handleRegisterPost = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("conteudo", conteudo);
        if (imagem) {
            formData.append("imagem", imagem);
        }

        try {
            const response = await criarPost({
                conteudo: conteudo,
                imagem: imagem,
            })

            toast.success("Post criado com sucesso!");
            setModalEnviar(false);
            setConteudo("");
            setImagem(null);
            fetchPost();

        } catch (error) {
            console.error("Erro ao criar o post:", error);
        }
    };

    const fetchPost = async () => {
        try {
            const data = await pegarTodosPosts();
            setPosts(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchPost();
    }, []);

    return (
        <section className="h-screen flex flex-col gap-4 p-4">
            <header className="h-20 flex">
                <div className="h-full flex items-center justify-start border-b w-1/2 mr-2 border-b-zinc-900 gap-4 mb-5 pl-4">
                    <Seguidores />
                </div>
                <div className="w-1/2 items-center justify-center flex ">
                    <button
                        className="border border-zinc-900 rounded-full p-2 text-white cursor-pointer hover:bg-zinc-900 transition-all duration-300 poppins-extrabold"
                        onClick={() => setModalEnviar(true)}
                    >
                        Criar post
                    </button>
                    {modalEnviar && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                            <div className="bg-zinc-900 p-8 rounded-lg w-1/2">
                                <h2 className="text-white text-2xl mb-4 poppins-extrabold">Criar Post</h2>
                                <form onSubmit={handleRegisterPost}>
                                    <textarea
                                        placeholder="Escreva seu post..."
                                        className="w-full h-32 p-2 mb-4 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:border-blue-500 poppins-extralight"
                                        value={conteudo}
                                        onChange={(e) => setConteudo(e.target.value)}
                                    ></textarea>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="mb-4 text-white"
                                        onChange={(e) => setImagem(e.target.files[0])}
                                    />
                                    <div className="flex justify-end gap-4">
                                        <Button
                                            type="button"
                                            onclick={() => setModalEnviar(false)}
                                        >
                                            Cancelar
                                        </Button>
                                        <Button
                                            type="submit"
                                        >
                                            Postar
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </header>
            <main className="items-center justify-center flex flex-col gap-10 h-full">
                {posts.length === 0 ? (
                    <p className="text-white text-4xl poppins-extrabold">Nenhum post encontrado.</p>
                ) : (
                    posts.map((post) => (
                        <Posts
                            key={post.id}
                            conteudo={post.conteudo}
                            imagem={post.imagem}
                        />
                    ))
                )}
            </main>
        </section>
    );
}

export default Feed;
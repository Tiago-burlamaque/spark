import { api } from "../api/axios.js";



export const pegarTodosPosts = async () => {
    const token = JSON.parse(localStorage.getItem('token'))
    const res = await api.get(
        "/post/buscar",
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

    return res.data
}

export const criarPost = async (formData) => {
    const token = JSON.parse(localStorage.getItem('token'))
    const res = await api.post(
        "/post/criar",
        formData,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

    return res.data
}
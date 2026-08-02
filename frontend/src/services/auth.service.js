import { api } from "../api/axios.js";

export const cadastro = async (data) => {
    const res = await api.post(
        "/auth/register",
        data
    )

    return res.data
}

export const login = async (data) => {
    const res = await api.post(
        "/auth/login",
        data
    )

    localStorage.setItem('token', JSON.stringify(res.data.token))
}
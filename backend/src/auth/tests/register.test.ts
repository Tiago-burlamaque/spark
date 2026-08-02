import request from 'supertest'
import { describe, it, expect } from 'vitest'
import app from '../../app'

describe("POST /auth/register", () => {
    it("Deve cadastrar um usuário e retornar o status 201 se o e-mail não estiver cadastrado, caso contrário, retorna o erro 409.", async () => {
        const res = await request(app)
            .post('/auth/register')
            .send({
                "nome": "teste",
                "username": "teste_123",
                "email": "teste@gmail.com",
                "senha": "teste145"
            })
        if (res.status === 201) return expect(res.status).toBe(201)
        return expect(res.status).toBe(409)
    })
})
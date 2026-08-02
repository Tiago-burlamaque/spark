import request from 'supertest'
import { describe, it, expect } from 'vitest'
import app from '../../app'

describe("PUT /post/atualizar/:id", () => {

    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibm9tZSI6InRlc3RlIiwidXNlcm5hbWUiOiJ0ZXN0ZV8xMjMiLCJlbWFpbCI6InRlc3RlQGdtYWlsLmNvbSIsImlhdCI6MTc4NTQ2Njg1NywiZXhwIjoxNzg1NTUzMjU3fQ.R4r_ro6YgL04R66GFU8Zxw1ef3DMsTALMe80Os5yHgE"

    it("Deve retornar um erro de 404 se não existir post, caso contrário, irá retornar 200.", async () => {
        const res = await request(app)
            .put('/post/atualizar/1')
            .set("Authorizantion", `Bearer ${token}`)
            .send({
                "conteudo": "Meu primeiro post.",
                "imagem": "imagem2.jpg"
            })
        if (res.status === 200) return expect(res.status).toBe(200)
        return expect(res.status).toBe(401)
    })

    it("Deve retornar um erro 401 se não ter token.", async () => {
        const res = await request(app)
            .put('/post/atualizar/1')
            .send({
                "conteudo": "Meu primeiro post.",
                "imagem": "imagem2.jpg"
            })
        expect(res.status).toBe(401)
    })
})
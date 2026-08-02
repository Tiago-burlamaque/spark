import request from 'supertest'
import { describe, it, expect } from 'vitest'
import app from '../../app'

describe("DELETE /post/deletar/:id", () => {

    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibm9tZSI6InRlc3RlIiwidXNlcm5hbWUiOiJ0ZXN0ZV8xMjMiLCJlbWFpbCI6InRlc3RlQGdtYWlsLmNvbSIsImlhdCI6MTc4NTQ2Njg1NywiZXhwIjoxNzg1NTUzMjU3fQ.R4r_ro6YgL04R66GFU8Zxw1ef3DMsTALMe80Os5yHgE"

    it("Deve retornar erro 404 se não existir nenhum post, caso contrário, retornara 200.", async () => {
        const res = await request(app)
            .delete('/post/deletar/1')
            .set("Authorization", `Bearer ${token}`)
        if (res.status === 404) return expect(res.status).toBe(404)
        return expect(res.status).toBe(200)
    })

    it("Deve retornar erro 401 se não tiver token.", async () => {
        const res = await request(app)
            .delete('/post/deletar/1')
        expect(res.status).toBe(401)
    })

})
import request from 'supertest'
import { describe, it, expect } from 'vitest'
import app from '../../app'

describe("POST /post", () => {

    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibm9tZSI6InRlc3RlIiwidXNlcm5hbWUiOiJ0ZXN0ZV8xMjMiLCJlbWFpbCI6InRlc3RlQGdtYWlsLmNvbSIsImlhdCI6MTc4NTQ2Njg1NywiZXhwIjoxNzg1NTUzMjU3fQ.R4r_ro6YgL04R66GFU8Zxw1ef3DMsTALMe80Os5yHgE"

    it("Deve dar erro de autorização", async () => {
        const response = await request(app)
            .post("/post/criar")
            .send({
                "conteudo": "fiz um desenho",
                "imagem": "imagem.jpg",
                "usuarioId": 1
            })

        expect(response.status).toBe(401);
    });

    it("Deve criar um post novo", async () => {
        const res = await request(app)
            .post("/post/criar")
            .set("Authorization", `Bearer ${token}`)
            .send({
                "conteudo": "fiz um desenho",
                "imagem": "imagem.jpg",
                "usuarioId": 1
            })
    })
}) 

import { describe, expect, it } from "vitest";
import request from 'supertest'
import app from "../../app";

describe("POST /auth/login", () => {
    it("Deve retornar erro de não autorizado, se não tiver e-mail cadastrado.", async () => {
        const res = await request(app)
            .post("/auth/login")
            .send({
                "email": "tiago@gmail.com",
                "senha": "tiago123"
            })
        expect(res.status).toBe(401)
    })

    it("Deve retornar status ok quando o usuário colocar os campos corretamente.", async () => {
        const res = await request(app)
            .post('/auth/login')
            .send({
                "email": "teste@gmail.com",
                "senha": "teste145"
            })
        expect(res.status).toBe(200)
    })

    it("Deve retornar um erro de não autorizado se a senha for diferente da que o usuário cadastrou.", async () => {
        const res = await request(app)
            .post('/auth/login')
            .send({
                "email": "teste@gmail.com",
                "senha": "tiago123"
            })
        expect(res.status).toBe(401)
    })
})
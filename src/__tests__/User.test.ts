import request from 'supertest';
import { app } from '../app';
import createConnection from '../database';


describe("User", ()=>{
    beforeAll(async ()=>{
        const connection = await createConnection();
        await connection.runMigrations();
    });

    it("Criação de um Usuario", async ()=>{
        const response = await request(app).post("/users").send({
            nome: "User Exemple",
            email: "user@exemple.com.br"
        });

        expect(response.status).toBe(201);
    });

    it("Criação de um Usuario com email que já existe", async ()=>{
        const response = await request(app).post("/users").send({
            nome: "User Exemple",
            email: "user@exemple.com.br"
        });

        expect(response.status).toBe(400);
    });
    
    
});
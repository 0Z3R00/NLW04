import request from 'supertest';
import { getConnection } from 'typeorm';
import { app } from '../app';
import createConnection from '../database';


describe("Survey", ()=>{
    beforeAll(async ()=>{
        const connection = await createConnection();
        await connection.runMigrations();
    });

    afterAll(async () =>{
        const connection = getConnection();
        await connection.dropDatabase();
        await connection.close();
    });

    it("Criação de uma nova Surveys ", async ()=>{
        const response = await request(app).post("/surveys").send({
            title: "Title Exemple",
            description: "description info exemple"
        });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
    });

    it("Get Surveys ", async ()=>{
        await request(app).post("/surveys").send({
            title: "Title Exemple2",
            description: "description info exemple"
        });

        const response = await request(app).get("/serveys");

        expect(response.body.length).toBe( 2 );
    });
   
});
import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AppError } from "../errors/AppError";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";

class AnswerController{

    /*http://localhost:3050/answers/1(route params)?u=4ce31ee8-998b-4301-8e88-cc869a109349
    Route params parametro que compõe a rota /
    http://localhost:3050/answers/:params/:params1
    Query params
    http://localhost:3050/answers?chave=valor
    */

    async execute(request : Request, response : Response){
        const  { value } = request.params;
        const { u } = request.query;

        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

        const surveyUser = await surveysUsersRepository.findOne({
            id: String(u), 
        });
         
        if(!surveyUser){
            throw new AppError("Survey User does not exists!", 400);
            
        }

        surveyUser.value = Number(value);

        await surveysUsersRepository.save(surveyUser);

        return response.json(surveyUser);
    }
}

export { AnswerController }
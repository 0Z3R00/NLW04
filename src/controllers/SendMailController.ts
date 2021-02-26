import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveyUser } from "../models/surveyUser";
import { resolve } from 'path';
import { SurveysRepository } from "../repositories/SurveysRepository";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";
import { UsersRepository } from "../repositories/UsersRepository";
import SendMailService from "../services/SendMailService";
import { AppError } from "../errors/AppError";


class SendMailController {
    async execute(request : Request, response : Response){
        const {email, survey_id} = request.body;

        const userRepository = getCustomRepository(UsersRepository);
        const surveyRepository = getCustomRepository(SurveysRepository);
        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

        
        const user = await userRepository.findOne({email});

        if(!user){
            throw new AppError("User does not exists !!!", 400);
            
        }

        const survey = await surveyRepository.findOne({id: survey_id});

        if(!survey){
            throw new AppError("Survey does not exists !!!", 400);
            
        }

        const npsPath = resolve(__dirname, "..", "view", "emails", "npsMail.hbs");
       

        const surveyUserAlreadyExists = await surveysUsersRepository.findOne({
            where: {user_id: user.id, value: null},
            relations:["user", "survey"]
        });

        const variables = {
            name: user.nome,
            title: survey.title,
            description: survey.description,
            id: "",
            link: process.env.URL_MAIL,
          }

        if(surveyUserAlreadyExists){
            variables.id = surveyUserAlreadyExists.id;
            await SendMailService.execute(email, survey.title, variables, npsPath);
            return response.json(surveyUserAlreadyExists);
        }else{
            
 
        //1° Salva as informações na tabela SurveyUser,
        const surveyUser = surveysUsersRepository.create({
            user_id: user.id,
            survey_id
        });

        await surveysUsersRepository.save(surveyUser);
        variables.id = surveyUser.id;
        //2° Enviar email para o usuario
        

        await SendMailService.execute(email, survey.title, variables, npsPath);

        return response.status(201).json(surveyUser);
        }

    };

    
}

export { SendMailController }
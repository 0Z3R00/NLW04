import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";
import * as yup from 'yup';
import { AppError } from "../errors/AppError";

class UserController {
    async create(request: Request, response: Response) {
        const { nome, email } = request.body;

        const schema = yup.object().shape({
            nome: yup.string().required(),
            email: yup.string().email().required()
        });

        try {
            await schema.validate(request.body, { abortEarly: false });
        } catch (error) {
            throw new AppError("Não passou na validação", 400);
        }

        const usersRepository = getCustomRepository(UsersRepository);

        const userAlreadyExists = await usersRepository.findOne({
            email
        });

        if (userAlreadyExists) {
            throw new AppError("Já existe um usuario com esse email !!!", 400);
        }

        const user = usersRepository.create({
            nome,
            email
        });

        await usersRepository.save(user);

        return response.status(201).json(user);
    }
}

export { UserController };

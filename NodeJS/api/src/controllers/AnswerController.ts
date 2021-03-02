import { Request, Response } from 'express';
import { getCustomRepository } from "typeorm";
import { AppError } from '../errors/AppError';
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";



class AnswerController {

    // http://localhost:3333/answers/1?u=8b13a959-386c-4056-87eb-c4ad5b6d76b8
    /**
     * 
      Route Params => Parametros que compõe a rota
      Exemplo:  http://localhost:3333/answers/1/5
                route.get("/answers/:value/:nota")

      Query Param => Busca, Paginacao, não obrigatória
      ?
      chave=valor
     */

    async execute(request: Request, response: Response) {
        const { value } = request.params;
        const { u } = request.query;

        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

        const surveyUser = await surveysUsersRepository.findOne({
            id: String(u),
        });

        if (!surveyUser) {
            throw new AppError("Survey User does not exists!");
        }

        surveyUser.value = Number(value);

        await surveysUsersRepository.save(surveyUser);

        return response.json(surveyUser);
    }

}

export { AnswerController }
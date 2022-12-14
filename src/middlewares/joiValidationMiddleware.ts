import { NextFunction, Request, Response } from "express";

const joiValidation = (schema: any) => {
    return  (req: Request, res: Response, next: NextFunction) =>{
        const validation = schema.validate(req.body, {abortEarly:false});
        if(validation.error) {
            const message = validation.error.details.map((details: any) => details.message)
            throw {type: 'unprocessable_entity', message}
        }
        next();
    };
};

export default joiValidation;

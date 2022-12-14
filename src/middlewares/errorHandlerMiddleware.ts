import { NextFunction, Request, Response } from "express";


// Error : {type, message}

export function errorHandlerMiddleware(
    err: Error | any, 
    req: Request,
    res: Response,
    next: NextFunction
){
    console.log(err)
    if(err.type) {
        if(err.message){
            return res.status(errorTypeToStatusCode(err.type)).send(err.message)
        }
        
        return res.sendStatus(errorTypeToStatusCode(err.type))
    }

    return res.sendStatus(500);
}


function errorTypeToStatusCode(errorType: string){
    
    if(errorType === 'unprocessable_entity') return 422;
    if(errorType === 'conflict') return 409;
    if(errorType === 'not_found') return 404;
    if(errorType === 'forbidden') return 403;
    if(errorType === 'unauthorized') return 401;

    return 400
}

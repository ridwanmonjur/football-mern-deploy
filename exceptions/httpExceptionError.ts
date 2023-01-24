export enum HttpStatusCode {
    OK = 200,
    BAD_REQUEST = 400,
    NOT_FOUND = 404,
    INTERNAL_SERVER = 500,
}
   
class BaseError extends Error {
    public readonly name: string;
    public readonly httpCode: HttpStatusCode;
    public readonly isOperational: boolean;

    constructor(name: string, httpCode: HttpStatusCode, description: string, isOperational: boolean) {
        super(description);
        Object.setPrototypeOf(this, new.target.prototype);

        this.name = name;
        this.httpCode = httpCode;
        this.isOperational = isOperational;

        Error.captureStackTrace(this);
    }
}

//free to extend the BaseError
class APIError extends BaseError {
    constructor(name, httpCode = HttpStatusCode.INTERNAL_SERVER, isOperational = true, description = 'internal server error') {
        super(name, httpCode, description, isOperational);
    }
}
/* 
USAGE:
 throw new APIError(
   'NOT FOUND',
   HttpStatusCode.NOT_FOUND,
   true,
   'detailed explanation'
 );
*/


class HTTP400BadRequestError extends BaseError {
    constructor(description = 'bad request') {
        super('BAD REQUEST', HttpStatusCode.BAD_REQUEST, description,  true);
    }
}

/* 
USAGE:
 throw new HTTP400BadRequestError(
   'detailed explanation'
 );
*/

class HTTP404NotFoundError extends BaseError {
    constructor(description = 'bad request') {
        super('NOT FOUND', HttpStatusCode.NOT_FOUND, description,  true);
    }
}

class HTTP500InternalServerrror extends BaseError {
    constructor(description = 'bad request') {
        super('INTERNAL SERVER', HttpStatusCode.INTERNAL_SERVER, description,  true);
    }
}





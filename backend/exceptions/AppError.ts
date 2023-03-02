import { StatusCodes } from "http-status-codes";

export class BaseError extends Error {
    public readonly name: string;
    public readonly httpCode: any;
    public readonly isOperational: boolean;
    public readonly description: any;

    constructor(name: string, httpCode: any, description: any, isOperational: boolean) {
        super(description);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = name;
        this.httpCode = httpCode;
        this.isOperational = isOperational;
        this.description = description;
        Error.captureStackTrace(this);
    }
}

export class APIError extends BaseError {
    constructor(description = 'internal server error', httpCode = StatusCodes.INTERNAL_SERVER_ERROR, name = 'BAD REQUEST', isOperational = true) {
        super(name, httpCode, description, isOperational);
    }

}

/***  client errors */
export class HTTP400BadRequestError extends BaseError {
    constructor(description = "Apparent client error or wrong JSON body (e.g., malformed request syntax, size too large, invalid request message framing, or deceptive request routing).") {
        super('BAD REQUEST', StatusCodes.BAD_REQUEST, description, true);
    }
}


export class HTTP401UnauthorizedError extends BaseError {
    constructor(description = 'No authentication done.') {
        super('UNAUTHORIZED', StatusCodes.UNAUTHORIZED, description, true);
    }
}

export class HTTP402PaymentRequiredError extends BaseError {
    constructor(description = 'No payment done.') {
        super('PAYMENT REQUIRED', StatusCodes.PAYMENT_REQUIRED, description, true);
    }
}

export class HTTP403ForbiddenError extends BaseError {
    constructor(description = 'No necessary permissions (roles/ authorizations) for a resource or or attempting a prohibited action (e.g. creating a duplicate record where only one is allowed).') {
        super('FORBIDDEN', StatusCodes.FORBIDDEN, description, true);
    }
}

export class HTTP404NotFoundError extends BaseError {
    constructor(description = 'Resource not found.') {
        super('NOT FOUND', StatusCodes.NOT_FOUND, description, true);
    }
}

export class HTTP405MethodNotAllowed extends BaseError {
    constructor(description = 'Wrong request method e.g. GET instead of POST.') {
        super('METHOD NOT ALLOWED', StatusCodes.METHOD_NOT_ALLOWED, description, true);
    }
}

export class HTTP406NotAccpetable extends BaseError {
    constructor(description = 'Wrong request headers.') {
        super('NOT ACCEPTABLE', StatusCodes.NOT_ACCEPTABLE, description, true);
    }
}

export class HTTP422UnproccessableEntity extends BaseError {
    constructor(description = "Wrong request body") {
        super('UNPROCESSABLE ENTITY', StatusCodes.UNPROCESSABLE_ENTITY, description, true);
    }
}

/***  server errors */
export class HTTP500InternalServerrror extends BaseError {
    constructor(description = 'bad request') {
        super('INTERNAL SERVER', StatusCodes.INTERNAL_SERVER_ERROR, description, true);
    }
}

export class HTTP501NotImplemented extends BaseError {
    constructor(description = 'ot implemented yet') {
        super('INTERNAL SERVER', StatusCodes.INTERNAL_SERVER_ERROR, description, true);
    }
}



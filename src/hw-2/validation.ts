import * as Joi from '@hapi/joi';

const scheme = Joi.object().keys({
    login: Joi.string().email().required(),
    password: Joi.string().regex(/^(?:\d+\w|\w+\d)[\w\d]+$/).required(),
    age: Joi.number().min(4).max(130).required()
});

function errorResponse(schemaErrors: any) {
    const errors = schemaErrors.map((error: any) => {
        let { path, message } = error;
        return { path, message };
    });
    return {
        status: 'error',
        errors
    }
}

export function validation() {
    return (req: any, res: any, next: any) => {
        const validationResult: Joi.ValidationResult = scheme.validate(req.body);

        if (validationResult.error) {
            res.status(400).json(errorResponse(validationResult.error.details))
        } else {
            next();
        }
    }
}

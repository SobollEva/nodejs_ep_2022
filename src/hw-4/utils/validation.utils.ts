import * as Joi from '@hapi/joi';
import { ValidationScheme } from '../types/common.type';

const userScheme = Joi.object().keys({
    login: Joi.string().email().required(),
    password: Joi.string().regex(/^(?:\d+\w|\w+\d)[\w\d]+$/).required(),
    age: Joi.number().min(4).max(130).required()
});

const groupScheme = Joi.object().keys({
    name: Joi.string().required(),
    permission: Joi.array().items(Joi.string().regex(/READ|WRITE|DELETE|SHARE|UPLOAD_FILES/i)).required(),
});

const userGroupScheme = Joi.object().keys({
    user_ids: Joi.array().items(Joi.string()).required(),
    group_id: Joi.string().required()
});

const validationScheme = { 
    [ValidationScheme.UserScheme] : userScheme, 
    [ValidationScheme.GroupScheme] : groupScheme, 
    [ValidationScheme.UserGroupScheme] : userGroupScheme 
}

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

export function validation(schemeName) {
    return (req: any, res: any, next: any) => {
        const validationResult: Joi.ValidationResult = validationScheme[schemeName].validate(req.body);

        if (validationResult.error) {
            res.status(400).json(errorResponse(validationResult.error.details))
        } else {
            next();
        }
    }
}

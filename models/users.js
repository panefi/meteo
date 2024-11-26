const Joi = require('joi');


const UserModel = Joi.object({
    email: Joi.string()
        .email({ tlds: { allow: false } })
        .required()
        .messages({
            'string.email': 'Please enter a valid email address.',
            'any.required': 'Email is required.'
        }),
    password: Joi.string()
        .pattern(new RegExp('^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'))
        .required()
        .messages({
            'string.pattern.base': 'Password must be at least 8 characters long and include letters, numbers, and symbols.',
            'any.required': 'Password is required.'
        }),
    name: Joi.string()
        .pattern(new RegExp('^[a-zA-Z]+ [a-zA-Z]+$'))
        .required()
        .messages({
            'string.pattern.base': 'Name must be in "First Last" format.',
            'any.required': 'Name is required.'
        })
});

module.exports = { UserModel };
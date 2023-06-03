const Joi = require("joi");
Joi.objectId = require('joi-objectid')(Joi);

const id = Joi.objectId();
const name = Joi.string().min(2).max(20);
const email = Joi.string().min(5);
const password = Joi.string().min(4);
const role = Joi.number().integer().positive().min(0);

const createUserValidation = Joi.object({
    
    name : name.required(),
    email : email.required(),
    password : password.required(),
    role : role,

})

const updateUserValidation = Joi.object({
    id: id.required(),
    name : name,
    email : email,
    password : password,
    role : role,
})

const getUserValidation = Joi.object({
    id : id.required(),
})

const deleteUserValidation = Joi.object({
    id : id.required()
})

module.exports = { createUserValidation, updateUserValidation, getUserValidation, deleteUserValidation } 
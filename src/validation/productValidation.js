const Joi = require("joi");

const id = Joi.string().min(3);
const name = Joi.string().min(2).max(20);
const price = Joi.number().integer();
const availableUnits = Joi.number().integer().positive().min(0);

const createProductValidation = Joi.object({
    
    name : name.required(),
    price : price.required(),
    availableUnits : availableUnits.required(),
})

const updateProductValidation = Joi.object({
    id: id.required(),
    name : name,
    price : price,
    availableUnits : availableUnits,
})

const getProductValidation = Joi.object({
    id : id.required(),
})

const deleteProductValidation = Joi.object({
    id : id.required()
})

module.exports = { createProductValidation, updateProductValidation, getProductValidation, deleteProductValidation } 
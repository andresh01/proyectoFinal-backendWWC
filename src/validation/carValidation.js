const Joi = require("joi");
Joi.objectId = require('joi-objectid')(Joi);

const id = Joi.objectId();
const user_id = Joi.objectId();
const product_id = Joi.objectId();
const quantity = Joi.number().integer().positive();

const addProductCarValidation = Joi.object({
    user_id : user_id,
    product_id : product_id.required(),
    quantity : quantity.required(),
})

const updateQuantityValidation = Joi.object({
    user_id : user_id,
    product_id : product_id.required(),
    quantity : quantity.required(),
})


const deleteProductValidator = Joi.object({
    id : id.required()
})


module.exports = { addProductCarValidation, updateQuantityValidation, deleteProductValidator } 
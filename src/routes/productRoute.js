const { Router } = require("express");
const { createProductValidation, updateProductValidation, getProductValidation, deleteProductValidation } = require('../validation/productValidation')
const validatorHandler = require("../middlewares/validatorHandler");
const { getAllProducts, getProductById, addNewProduct, updateProduct, deleteProduct } = require("../controllers/productController");
const { isAuthAdmin, isAuthUser } = require('../middlewares/isAuth');

const routes = new Router();


const BASE = "/api/v1/products";

routes.get(`${BASE}/health`, (_, res) => res.send("check")); //sirve para evaluar el tiempo de respuesta y saber la eficiencia del servidor

routes.get(`${BASE}`, isAuthUser, getAllProducts)
routes.get(`${BASE}/:id`, isAuthUser, validatorHandler(getProductValidation, "params"), getProductById)
routes.post(BASE, isAuthAdmin, validatorHandler(createProductValidation, "body"), addNewProduct) 
routes.patch(`${BASE}/:id`, isAuthAdmin, validatorHandler(updateProductValidation, "params"), updateProduct)
routes.delete(`${BASE}/:id`, isAuthAdmin, validatorHandler(deleteProductValidation, "params") , deleteProduct)


module.exports = routes;
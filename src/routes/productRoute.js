const { Router } = require("express");
const { createProductValidation, updateProductValidation, getProductValidation, deleteProductValidation } = require('../validation/productValidation')
const validatorHandler = require("../middlewares/validatorHandler");
const { getAllProducts, getProductById, addNewProduct, updateProduct, deleteProduct } = require("../controllers/productController");
const { isAuth } = require('../middlewares/isAuth');

const routes = new Router();


const BASE = "/api/v1/products";

routes.get(`${BASE}/health`, (_, res) => res.send("check")); //sirve para evaluar el tiempo de respuesta y saber la eficiencia del servidor

routes.get(`${BASE}`,isAuth(), getAllProducts)
routes.get(`${BASE}/:id`, isAuth(), validatorHandler(getProductValidation, "params"), getProductById)
routes.post(BASE, isAuth(1), validatorHandler(createProductValidation, "body"), addNewProduct) 
routes.patch(`${BASE}/:id`, isAuth(1), validatorHandler(updateProductValidation, "params"), updateProduct)
routes.delete(`${BASE}/:id`, isAuth(1), validatorHandler(deleteProductValidation, "params") , deleteProduct)


module.exports = routes;
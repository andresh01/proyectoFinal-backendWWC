const { Router } = require("express");

const validatorHandler = require("../middlewares/validatorHandler");
const { getAllProducts, getProductById, addNewProduct, updateProduct, deleteProduct } = require("../controllers/productController");
const { isAuthAdmin, isAuthUser } = require('../middlewares/isAuth');

const routes = new Router();


const BASE = "/api/v1/car";

routes.get(`${BASE}/health`, (_, res) => res.send("check")); //sirve para evaluar el tiempo de respuesta y saber la eficiencia del servidor

routes.get(`${BASE}`, isAuthUser)
routes.post(BASE, isAuthAdmin ) 
routes.patch(`${BASE}/:id`, isAuthAdmin, )
routes.delete(`${BASE}/:id`, isAuthAdmin)


module.exports = routes;
const { Router } = require("express");

const validatorHandler = require("../middlewares/validatorHandler");
const { addProductCarValidation, updateQuantityValidation, deleteProductValidator } = require('../validation/carValidation')
const { getCar, addToCar, updateQuantity, deleteProductCar } = require("../controllers/carController");
const { isAuth } = require('../middlewares/isAuth');

const routes = new Router();


const BASE = "/api/v1/car";

routes.get(`${BASE}/health`, (_, res) => res.send("check")); //sirve para evaluar el tiempo de respuesta y saber la eficiencia del servidor

routes.get(`${BASE}`, isAuth(), getCar)
routes.post(`${BASE}`, isAuth(), validatorHandler(addProductCarValidation, "body"), addToCar ) 
routes.patch(`${BASE}`, isAuth(), validatorHandler(updateQuantityValidation, "body"),updateQuantity )
routes.delete(`${BASE}/:id`, isAuth(), validatorHandler(deleteProductValidator, "params"), deleteProductCar )


module.exports = routes;
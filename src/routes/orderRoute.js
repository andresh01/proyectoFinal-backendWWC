const { Router } = require("express");

//const validatorHandler = require("../middlewares/validatorHandler");
//const { addProductCarValidation, updateQuantityValidation, deleteProductValidator } = require('../validation/carValidation')
const { getOrder, createNewOrder } = require("../controllers/orderController");
const { isAuth } = require('../middlewares/isAuth');

const routes = new Router();


const BASE = "/api/v1/order";

routes.get(`${BASE}/health`, (_, res) => res.send("check")); //sirve para evaluar el tiempo de respuesta y saber la eficiencia del servidor

routes.get(`${BASE}/:id`, isAuth(), getOrder)
routes.post(`${BASE}`, isAuth(), createNewOrder ) 
/*routes.patch(`${BASE}`, isAuth(), validatorHandler(updateQuantityValidation, "body"),updateQuantity )
routes.delete(`${BASE}/:id`, isAuth(), validatorHandler(deleteProductValidator, "params"), deleteProductCar ) */


module.exports = routes;
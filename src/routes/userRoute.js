const { Router } = require("express");
const { getAllUser, getUserById, addNewUser, updateUser, deleteUser} = require('../controllers/userController')
const { createUserValidation, updateUserValidation, getUserValidation, deleteUserValidation }  = require('../validation/userValidation');
const validatorHandler = require("../middlewares/validatorHandler");
const { isAuth } = require('../middlewares/isAuth')

const route = new Router();

const BASE = "/api/v1/users";

route.get(`${BASE}/health`, (_, res) => res.send("check")); //sirve para evaluar el tiempo de respuesta y saber la eficiencia del servidor

route.get(BASE, isAuth(1), getAllUser);
route.get(`${BASE}/:id`, isAuth(), validatorHandler(getUserValidation, "params"), getUserById);
route.post(BASE, validatorHandler(createUserValidation, "body"), addNewUser);
route.patch(`${BASE}/:id`, isAuth(1), validatorHandler(updateUserValidation, "params"), updateUser);
route.delete(`${BASE}/:id`, isAuth(1), validatorHandler(deleteUserValidation, "params"), deleteUser);

module.exports = route;
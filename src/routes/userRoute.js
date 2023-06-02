const { Router } = require("express");
const { getAllUser, getUserById, addNewUser, updateUser, deleteUser} = require('../controllers/userController')

const route = new Router();

const BASE = "/api/v1/users";

route.get(`${BASE}/health`, (_, res) => res.send("check")); //sirve para evaluar el tiempo de respuesta y saber la eficiencia del servidor

route.get(BASE, getAllUser);
route.post(BASE, addNewUser);
route.patch(`${BASE}/:id`, updateUser);
route.delete(`${BASE}/:id`, deleteUser);

module.exports = route;
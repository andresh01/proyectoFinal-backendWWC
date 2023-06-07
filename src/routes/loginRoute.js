const { Router } = require("express");
const { loginIn } = require('../controllers/authController')

const route = new Router();

const BASE = "/api/v1/login";

route.get(`${BASE}/health`, (_, res) => res.send("check")); //sirve para evaluar el tiempo de respuesta y saber la eficiencia del servidor

route.post(`${BASE}?`, loginIn);

module.exports = route;
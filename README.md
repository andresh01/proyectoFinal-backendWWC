[![Mi primer workflow](https://github.com/andresh01/proyectoFinal-backendWWC/actions/workflows/main.yml/badge.svg)](https://github.com/andresh01/proyectoFinal-backendWWC/actions/workflows/main.yml)


# CARRITO DE COMPRAS.

Este es un servidor que sirve como carro de compras online donde se almacenan y usan datos de usuarios, productos para añadir a un carrito de compras y posteriormente generar una orden de venta. todo esto autenticado con jwt para mantener sesiones y almacenado en la base de datos Mongodb.

Tabla de contenido | CRUD
---|---
[Inicio](#inicio)| 
[Documentacion](#documentacion)| [Delete](#delete)|
[login](#login)|[ReadOne](#readone)|
[Products](#products)| [Create](#create)|
[Users](#users)| 
[Car](#car)|
[Order](#order)|

## Inicio y configuracion

1. Para trabajar con este servidor es necesario que se tenga una cuenta en `MongoDb` que es la base de datos donde se guardara la informacion.

2. Crear un archivo `.env`en la raiz del proyecto que contenga la siguiente informacion:
    - `MONGODB_CONNECTION` = "mongodb+srv://user:password.mongodb.net/nameDB"
    - `PORT` = numero del puerto 
    - `JWT_SECRET_KEY`= "palabra secreta para el token JWT"

3. Instalar las dependencias necesarias para el proyecto

4. Usar el comando `npm run start`para levantar el servidor

Notice that not only do we see out new Ford in our database, but we also get 3 messages printed out to the shell.

**Note:** Just because we can use JavaScript in the Shell doesn't mean we can use these same commands in Node.js though:

"JavaScript in MondgoDB: Although these methods use JavaScript, most interactions with MongoDB do not use JavaScript but use an idiomatic driver in the language of the interacting application."

This means that if we want to build an application then we should use the library provided by MongoDB. The [Node.js Docs](http://mongodb.github.io/node-mongodb-native/3.0/) are found here.

## Documentacion

 - REST.
   
 Base url: `http://localhost:puerto/api/v1/`
 esta la url base donde se pueden dirigir a las diferentes rutas que contiene el programa

 url: `http://localhost:3000/api/v1/products`
 Esta url nos muestra el listado de los productos que se encuentran disponibles

 url: `http://localhost:3000/api/v1/users`
 Esta url nos servira para realizar el CRUD a los usuarios que se registren

 url: `http://localhost:3000/api/v1/login`
 Esta url solo nos sirve para realizar post con email y password para que nos devuelva un token autenticado

 url `http://localhost:3000/api/v1/car`
 Esta url nos permite realizar un post de productos para cada usuario ademas actualizar la cantidad deseada de cada producto tambien nos permite realizar get para obtener todos los productos agregados al carro y nos deja eliminar productos del carro

 url `http://localhost:3000/api/v1/order`
 Esta url nos permite hacer post para agregar los productos del carrito a una orden de venta, tambien nos muestra todas las ordenes que estan guardadas


## Login:
La mayor parte de la aplicacion funciona con diferentes tipos de accesos por lo que tendras que registrarte como usuario antes de realizar algun tipo de interaccion aparte de ver los productos disponibles.

En la url: `http://localhost:3000/api/v1/login?email=&password=` deberas añadir como parametro el email y el password para asi obtener el token con el que podras realizar las diferentes consultas

## Products
ingresando la ruta `http://localhost:3000/api/v1/products` te devuelve el listado de los productos existentes, el formato de la respuesta es el siguiente:
`[
    {
        "_id": "64796510673b8dc0e25801dc",
        "name": "chaqueta",
        "price": 50000,
        "availableUnits": 30
    },
    {
        "_id": "647fdade7b80def3a5f97f78",
        "name": "zapatos",
        "price": 80000,
        "availableUnits": 10
    },
    {
        "_id": "648bca137b202c3993b8d243",
        "name": "camiseta",
        "price": 5000,
        "availableUnits": 80
    }
]`

## Users
Como tarea inicial deberas crear un usuario en la siguiente ruta `http://localhost:3000/api/v1/users` pasando como parametro en el body los siguentes datos:

`{
    "name":"userName" ,
    "email":"email" ,
    "password": "password"
}`

como respuesta te devolvera el siguiente formato:

`{
    "status": 200,
    "message": "User was created",
    "User": {
        "name":"userName" ,
        "email":"email" ,
        "password": "password",
        "role": 2,
        "_id": "648bc87b7b202c3993b8d238"
    }
}`


## Car
En la ruta `http://localhost:3000/api/v1/car` podemos realizar post de los productos que queramos comprar. En el body se debe enviar el id del producto que deseemos añadir y la cantidad que queremos de ese producto:

`{
    "product_id": "648bca757b202c3993b8d24b",
    "quantity": 1
}`


## Order
En la url: `http://localhost:3000/api/v1/order` se puede crear una orden de venta de los productos ingresados al carrito de cada usuario solo enviandole en el header el token generado al momento de loguearse


## Metodos

### Delete
Para realizar un delete en cualquier entidad solo se necesita pasar el token en el header y el id del campo que desee eliminar como parametro:
    -`http://localhost:3000/api/v1/products/64796510673b8dc0e25801dc`

### Read One
Para obtener la informacion de un solo item de cualquier entidad solo se necesita pasar el token en el header y el id del campo que desee consultar como parametro:
    - `http://localhost:3000/api/v1/products/64796510673b8dc0e25801dc`

### Create 
Para crear un item de cualquier entidad es necesario pasar el token en el header y en el body pasar la informacion que se requiera como por ejemplo:
-   `http://localhost:3000/api/v1/products`    
    -   `{
         "name": "televisor",
         "price": 100000,
         "availableUnits": 10
        } `

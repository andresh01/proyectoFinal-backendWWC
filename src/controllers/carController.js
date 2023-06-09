const { Car } = require('../models/carModel');
const jwt = require('jsonwebtoken');

exports.getCar = async (_, res, next) => {
    try {
        const car = await Car.find();
        res.status(200).json(car);
    } catch (error) {
        next(error);
    }
}



exports.addToCar = async (req, res, next) => {
    const { product_id, quantity } = req.body;

    const tokenJwt = req.headers.token;

    try {
    const { user_id } = jwt.verify(tokenJwt, process.env.JWT_SECRET_KEY);

    const shoppingCar = {
        user_id: user_id,
        product_id: product_id,
        quantity: quantity
    }

        const resp = await Car.create(shoppingCar);
        res.status(200).json({
            status: 200,
            message: "product was added",
            product: resp
        });
    } catch (error) {
        next(error);
    } 
}

exports.updateQuantity = async (req, res, next) => {
    const { product_id, quantity } = req.body;
    
    const tokenJwt = req.headers.token;

    try {
        const { user_id } = jwt.verify(tokenJwt, process.env.JWT_SECRET_KEY);

        const productCar = await Car.findOneAndUpdate({ _id: user_id } && {product_id: product_id}, { $set: { quantity: quantity } });
       
        if (productCar == null) {
            res.status(404).json({
                status: 404,
                message: "product not found",
            })
        } else {
            res.status(200).json({
                status: 200,
                message: "Quantity was updated",
                product: productCar,
                update: quantity
            })
        }
    } catch (error) {
        next(error);
    }
}

exports.deleteProduct = async (req, res, next) => {
    /* const { id } = req.params;
    
    try {
        const product = await Products.findOneAndDelete({ _id: id });
        if (product == null) {
            res.status(404).json({
                status: 404,
                message: "product not found",
            })
        } else {
            res.status(200).json({
                status: 200,
                message: "product was deleted",
                product: product
            })
        }
    } catch (error) {
        next(error);
    } */
}
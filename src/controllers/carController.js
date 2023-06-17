const { Car } = require('../models/carModel');
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");


const getCar = async (req, res, next) => {
    const tokenJwt = req.headers.token;

    try {
        const { user_id } = jwt.verify(tokenJwt, process.env.JWT_SECRET_KEY);

        const car = await Car.aggregate([
            { $match: { user_id: new mongoose.Types.ObjectId(user_id) } },
            {
                $lookup: {
                    from: 'products',
                    localField: 'product_id',
                    foreignField: '_id',
                    as: 'products'
                }
            },
            {
                $unwind: '$products',
            },
            {
                $project: {
                    _id: 1, product_id: 1, quantity: 1, products: { name: 1, quantity: 1, price: 1 }
                }
            }
        ]);

        res.status(200).json(car);
        return car;
        
    } catch (error) {
        next(error);
    }
}



const addToCar = async (req, res, next) => {
    const { product_id, quantity } = req.body;

    const tokenJwt = req.headers.token;

    try {

        const { user_id } = jwt.verify(tokenJwt, process.env.JWT_SECRET_KEY);


        const productExist = await Car.find({ user_id: user_id } && { product_id: product_id });


        if (productExist.length != 0) {
            res.status(400).json({
                status: 400,
                message: "product already exist",
            })
        } else {


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
        }
    } catch (error) {
        next(error);
    }
}

const updateQuantity = async (req, res, next) => {
    const { product_id, quantity } = req.body;

    const tokenJwt = req.headers.token;

    try {
        const { user_id } = jwt.verify(tokenJwt, process.env.JWT_SECRET_KEY);

        const productCar = await Car.findOneAndUpdate({ _id: user_id } && { product_id: product_id }, { $set: { quantity: quantity } });

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

const deleteProductCar = async (req, res, next) => {
    const { id } = req.params;

    const tokenJwt = req.headers.token;
    try {
        const { user_id } = jwt.verify(tokenJwt, process.env.JWT_SECRET_KEY);

        const product = await Car.findOneAndDelete({ user_id: user_id } && { product_id: id });
        
        if (product == null) {
            res.status(404).json({
                status: 404,
                message: "product does not exist",
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
    }
}



module.exports = { getCar, addToCar, updateQuantity, deleteProductCar }
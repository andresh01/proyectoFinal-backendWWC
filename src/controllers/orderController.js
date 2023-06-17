const { Order } = require('../models/orderModel');
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");
const { Car } = require("../models/carModel");
const { Products } = require("../models/productModel");

/* const getOrder = async (req, res, next) => {
    const tokenJwt = req.headers.token;

    const { id } = req.params;

    try {
        const { user_id } = jwt.verify(tokenJwt, process.env.JWT_SECRET_KEY);

        const order = await Order.find({ _id: id });
        res.status(200).json(order);
    } catch (error) {
        next(error);
    }
} */

const getAllOrders = async (req, res, next) => {
    try {
        const order = await Order.find();
        res.status(200).json(order);
    } catch (error) {
        next(error);
    }
}

const createNewOrder = async (req, res, next) => {
    const tokenJwt = req.headers.token;
    const { user_id, email, name } = jwt.verify(tokenJwt, process.env.JWT_SECRET_KEY);
    
    try {

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

        let prod = [];

        car.forEach(element => {
            const object = {
                name: element.products.name,
                quantity: element.quantity,
                price: element.products.price
            }
            prod.push(object)
        });

        const orderCar = {
            userName: name, 
            email: email,
            products: prod
        }

        const resp = await Order.create(orderCar);
        res.status(200).json({
            status: 200,
            message: "Order was added",
            product: resp
        });

        if(resp) {
            car.forEach(async element => {
                productInfo = await Products.find({ _id: element.product_id });
                
                let newQuantity = (productInfo[0].availableUnits - element.quantity);
                await Products.findOneAndUpdate({ _id: element.product_id }, { $set: { availableUnits: newQuantity } });
            });
        }

    } catch (error) {
        next(error);
    }

}

module.exports = { getAllOrders, createNewOrder }
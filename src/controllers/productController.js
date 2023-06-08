const { Products } = require('../models/productModel');

exports.getAllProducts = async (_, res, next) => {
    try {
        const products = await Products.find();
        res.status(200).json(products);
    } catch (error) {
        next(error);
    }
}

exports.getProductById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const products = await Products.find({ _id: id });
        
        if (products.length == 0) {
            res.status(404).json({
                status: 404,
                message: "product not found",
            })
        } else {
            res.status(200).json({
                status: 200,
                message: "product found",
                product: products,
            });
        }
    } catch (error) {
        next(error);
    }
}

exports.addNewProduct = async (req, res, next) => {
    const product = req.body;
    
    try {
        
        const resp = await Products.create(product);
        res.status(200).json({
            status: 200,
            message: "product was created",
            product: resp
        });
    } catch (error) {
        next(error);
    }
}

exports.updateProduct = async (req, res, next) => {
    const { id } = req.params;
    const updateProduct = req.body;
    try {
        const product = await Products.findOneAndUpdate({ _id: id }, { $set: { ...updateProduct } });
        if (product == null) {
            res.status(404).json({
                status: 404,
                message: "product not found",
            })
        } else {
            res.status(200).json({
                status: 200,
                message: "Product was updated",
                product: product,
                update: updateProduct
            })
        }
    } catch (error) {
        next(error);
    }
}

exports.deleteProduct = async (req, res, next) => {
    const { id } = req.params;
    
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
    }
}
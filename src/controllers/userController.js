const {User} = require('../models/userModel');


exports.getAllUser = async (_, res, next) => {
    try {
        const user = await User.find();
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}

exports.getUserById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const User = await User.find({ _id: id });
        if (User.length == 0) {
            res.status(404).json({
                status: 404,
                message: "User not found",
            })
        } else {
            res.status(200).json({
                status: 200,
                message: "User found",
                User: User
            });
        }
    } catch (error) {
        next(error);
    }
}

exports.addNewUser = async (req, res, next) => {
    const user = req.body;

    try {
        const resp = await User.create(user);
        res.status(200).json({
            status: 200,
            message: "User was created",
            User: resp
        });
    } catch (error) {
        next(error);
    }
}

exports.updateUser = async (req, res, next) => {
    const { id } = req.params;
    const updateUser = req.body;
    try {
        const user = await User.findOneAndUpdate({ _id: id }, { $set: { ...updateUser } });
        if (user == null) {
            res.status(404).json({
                status: 404,
                message: "User not found",
            })
        } else {
            res.status(200).json({
                status: 200,
                message: "User was updated",
                User: user,
                update: updateUser
            })
        }
    } catch (error) {
        next(error);
    }
}

exports.deleteUser = async (req, res, next) => {
    const { id } = req.params;
    try {
        const user = await User.findOneAndDelete({ _id: id });
        if (user == null) {
            res.status(404).json({
                status: 404,
                message: "User not found",
            })
        } else {
            res.status(200).json({
                status: 200,
                message: "User was deleted",
                User: user
            })
        }
    } catch (error) {
        next(error);
    }
}
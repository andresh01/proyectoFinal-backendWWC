const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
    
    userName: { type: String, required: true },
    email: { type: String, required: true },
    products:[],
},
    { versionKey: false } //no muestra el _v en la base de datos mongoDB
)

exports.Order = mongoose.model("order", OrderSchema);


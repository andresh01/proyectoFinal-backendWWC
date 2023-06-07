const mongoose = require("mongoose");

const CarSchema = mongoose.Schema({
    
    id_user: { type: String, required: true },
    id_product: { type: String, required: true },
    quantity: { type: String, required: true, default: 0 },
},
    { versionKey: false } //no muestra el _v en la base de datos mongoDB
)

exports.Car = mongoose.model("car", UserSchema);
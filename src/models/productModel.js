const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    availableUnits: { type: Number, required: false, default: 0 }

},
    { versionKey: false } //no muestra el _v en la base de datos mongoDB
)

exports.Products = mongoose.model("products", ProductSchema);
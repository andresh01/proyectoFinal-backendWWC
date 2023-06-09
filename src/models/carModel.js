const mongoose = require("mongoose");

const CarSchema = mongoose.Schema({
    
    user_id: { type: mongoose.Schema.Types.ObjectId, ref:'user' },
    product_id: { type: mongoose.Schema.Types.ObjectId, ref:'products' },
    quantity: { type: Number, required: true, default: 1 },
},
    { versionKey: false } //no muestra el _v en la base de datos mongoDB
)

exports.Car = mongoose.model("car", CarSchema);
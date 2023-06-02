const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true, default: 0 },
    role: { type: Number, required: false, default: 2 },
},
    { versionKey: false } //no muestra el _v en la base de datos mongoDB
)

exports.User = mongoose.model("user", UserSchema);
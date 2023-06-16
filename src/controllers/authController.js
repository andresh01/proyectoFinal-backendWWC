const jwt = require('jsonwebtoken');
const { User } = require('../models/userModel');


exports.loginIn = async (req, res, next) => {
    const { email, password } = req.query;

    try {
        if (email === undefined || email === null || email === ""){
            res.status(401).send("Email required")
        }

        if (password === undefined || password === null || password === ""){
            res.status(401).send("Password required")
        }

        const user = await User.find({ email: email } && { password: password })
        
        if (user.length !== 0) {

            token = jwt.sign(
                {user_id: user[0]._id,name: user[0].name, email: email, role: user[0].role},
                process.env.JWT_SECRET_KEY,
                { expiresIn: "1h"}
            )
            
            res.status(200).json({
                data: token
            })
            
        } else {
            res.status(401).json({
                message: 'User not authenticated'
            })
        }
    } catch (error) {
        next(error);
    }
}

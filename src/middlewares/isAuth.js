const jwt = require("jsonwebtoken");
const { token } = require('../controllers/authController')

exports.isAuthAdmin = (req, res, next) => {
console.log(token)
    //const token = req.headers.authorization;
    try {
        let decodeToken = jwt.verify(token, process.env.JWT_SECRET_KEY)
        
        if(decodeToken.role === 1){
            next()
        } else{
            res.status(401).json({
                message: 'Access denied'
            })
        }
    } catch (error) {
        console.log(error);
        res.status(401);
        res.send(error.message || 'Access forbidden');
        return;
    }

    
}

exports.isAuthUser = (req, res, next) => {

    const token = req.headers.authorization;
    try {
        let decodeToken = jwt.verify(token, process.env.JWT_SECRET_KEY)
        
        if(decodeToken.role === 2){
            next()
        } else{
            res.status(401).json({
                message: 'Access denied'
            })
        }
    } catch (error) {
        console.log(error);
        res.status(401);
        res.send(error.message || 'Access forbidden');
        return;
    }

    
}
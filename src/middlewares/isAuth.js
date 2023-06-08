const jwt = require("jsonwebtoken");

exports.isAuthAdmin = (req, res, next) => {

    const tokenJwt = req.headers.token;
    try {
        let decodeToken = jwt.verify(tokenJwt, process.env.JWT_SECRET_KEY)
        
        if(decodeToken.role === 1){
            next()
        } else{
            res.status(401).json({
                message: 'Access forbidden'
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

    const tokenJwt = req.headers.token;
    try {
        let decodeToken = jwt.verify(tokenJwt, process.env.JWT_SECRET_KEY)
        
        if(decodeToken.role === 2){
            next()
        } else{
            res.status(401).json({
                message: 'Access forbidden'
            })
        }
    } catch (error) {
        console.log(error);
        res.status(401);
        res.send(error.message || 'Access forbidden');
        return;
    }

    
}
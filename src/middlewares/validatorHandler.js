function validatorHandler (schema, property) {
    return (req, res, next) => {
        const data = req[property];
        const { error } = schema.validate(data, {abortEarly: false});

        if(error) {
            res.json(error.message);
            next(error);
        }
        next();
    }
}

module.exports = validatorHandler;
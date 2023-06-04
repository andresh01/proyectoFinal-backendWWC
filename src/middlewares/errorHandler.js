function errors (err, _, _, next) {
    console.error(err);
    next(err);
}

function errorHandler (err, _, res, _) {
    res.status(500).json({
        message: err.message,
        stack: err.stack
    });
}

function errorPath (req, res, _) {
    res.status(404).send(`The path ${req.path} does not exist on this server`)
}
module.exports = { errors, errorHandler, errorPath }
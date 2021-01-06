module.exports = {
    send: (err, res, code = 400) => {
        res.status(code).json({
            error: err
        });
    }
};
const { check, validationResult } = require("express-validator");

const userValidation = {
    validations: [
        check('_name', 'O nome é obrigatório.').notEmpty(),
        check('_email', 'O email é inválido.').notEmpty().isEmail()
    ],
    errors: (app, req, res) => {
        let errors = validationResult(req); 
        if(!errors.isEmpty())
        {
            app.utils.error.send(errors.array(), res);
            return false;
        }
        else
        {
            return true;
        }
    }
}

module.exports = userValidation;
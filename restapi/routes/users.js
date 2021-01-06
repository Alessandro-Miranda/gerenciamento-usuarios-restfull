const NeDB = require("nedb");
const userValidation = require('../utils/validator');

let db = new NeDB({
    filename: 'users.db',
    autoload: true
});

// forma de criar as rotas usando consign
module.exports = app =>
{
    let route = app.route('/users');

    route.get((_req, res) => {
        //find retorna todos os itens do banco NeDB
        // 1 para ordernar de forma ascendente ou -1 para ordenar de forma descendente
        db.find({}).sort({ name: 1 }).exec((err, users) =>
        {
            if(err)
            {
                app.utils.error.send(err, res);
            }
            else
            {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json({
                    users
                });
            }
        });
    });

    // validação no post usando o express validator (check e validationResult)
    route.post(userValidation.validations, (req, res) => {
        
        if(!userValidation.errors(app, req, res)) return false;
        
        // metódo insert insere informações no banco
        db.insert(req.body, (err, user) => {
            if(err)
            {
                app.utils.error.send(err, res);
            }
            else
            {
                res.status(200).json(user);
            }
        });
    });

    let routeId = app.route('/users/:id');

    routeId.get((req, res) => {
        // findOne retorna apenas um item especificado
        db.findOne({ _id: req.params.id }).exec((err, user) => {
            if(err)
            {
                app.utils.error.send(err, res);
            }
            else
            {
                res.status(200).json(user);
            }
        });
    });

    routeId.put(userValidation.validations, (req, res) => {
        
        if(!userValidation.errors(app, req, res)) return false;
            
        // passa o filtro (id) e os dados que estão no body da requisição
        db.update({ _id: req.params.id }, Object.assign(req.params, req.body), err => {
            if(err)
            {
                app.utils.error.send(err, res);
            }
            else
            {
                res.status(200).json(Object.assign(req.params, req.body));
            }
        });
    });

    routeId.delete((req, res) => {
        db.remove({ _id: req.params.id }, err => {
            if(err)
            {
                app.utils.error.send(err, res);
            }
            else
            {
                res.status(200).json(Object.assign(req.params));
            }
        });
    });
};
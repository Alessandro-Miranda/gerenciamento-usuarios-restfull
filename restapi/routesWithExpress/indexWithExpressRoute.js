// Criação da rota utilizando o Routes do express
routes.get('/', (req, res) => {
    console.log("URL: " + req.url);
    console.log("Method: " + req.method);

    res.statusCode = 200;
    res.setHeader("Content-Type", 'text/html');
    res.end("<h1>Olá, mundo!</h1>");
});

module.exports = routes;
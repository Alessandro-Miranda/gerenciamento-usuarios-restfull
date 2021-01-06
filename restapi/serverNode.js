// Subir o servidor utilizando o node

const http = require("http");

let server = http.createServer((req, res) => {
    switch(req.url)
    {
        case '/':
            res.statusCode = 200;
            res.setHeader("Content-Type", 'text/html');
            res.end("<h1>Olá, mundo!</h1>");
            break;

        case '/users':
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({
                users: [{
                    id: 1,
                    name: 'Alessandro',
                    email: 'alessandro@alessandro.com'
                },
            {
                id: 2,
                name: "João",
                email: "joaodasilva@teste.com"
            }]
            }));
    }
});

server.listen(3000, "127.0.0.1", () =>
{
    console.log("Server is running...");
});
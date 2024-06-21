const http = require('http');
const fs = require('fs').promises;
const path = require('path');

async function readArchive(archivePath) {
    try {
        const data = await fs.readFile(archivePath, 'utf8');
        return data;
    } catch (error) {
        throw new Error(`Erro ao ler o arquivo -> ${error}`);
    }
}

const startServer = http.createServer(async function(request, response) {
    response.writeHead(200, {'Content-Type': 'text/html'});
    
    if (request.url == '/' || request.url == '/artigos') {
        try {
            const archivePath = path.join(__dirname, 'Pages', 'artigos.html');
            const archiveContent = await readArchive(archivePath);
            response.write(archiveContent);
        } catch (error) {
            console.error(error);
            response.writeHead(500, {'Content-Type': 'text/plain'});
            response.write('Erro interno ao processar a requisição.');
        }
    } else if (request.url == '/contatos') {
        response.write('<h1>Contatos Page</h1>');
    } else {
        response.writeHead(404, {'Content-Type': 'text/plain'});
        response.write('Página não encontrada.');
    }
    
    response.end();
});

startServer.listen(3000, function() {
    console.log("#### Server ON ####");
});

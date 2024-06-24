const hhtp = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');

// Função de Gerenciar rotas
const rotear = function(pathname){
    if (pathname && pathname !== '/'){
        const arquivo = path.join(__dirname, `${pathname}.html`)
        const existe = fs.existsSync(arquivo);
        if (existe) {
            return arquivo;
        }
        return path.join(__dirname, 'erro.html');
    }
    return path.join(__dirname, 'artigos.html');
};

// Iniciando o servidor 
const server = http.createServer((request, response) => {
    // Obtendo o pathname
    const pathname = url.parse(request.url).pathname;
    // Processando o roteamento do pathname 
    const pagina = rotear(pathname);
    // Renderizando
    fs.readFile(pagina, (err, html) => {
        response.writeHeader(200, {'Content-type' : 'text/html'});
        response.end(html);
    });
});

server.listen(3000, () => {
    console.log("### Server ON ###");
})
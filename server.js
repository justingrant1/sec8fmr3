const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const server = http.createServer((req, res) => {
    // Decode the URL to handle spaces and special characters
    let filePath = '.' + decodeURIComponent(req.url);
    
    // Endpoint to list JSON files for county/state detection
    if (filePath === './list-json-files' || filePath === './list-json-files' || filePath === '/list-json-files') {
        console.log("List JSON files endpoint called:", filePath);
        
        fs.readdir('.', (err, files) => {
            if (err) {
                res.writeHead(500);
                res.end('Error reading directory');
                return;
            }
            
            const jsonFiles = files.filter(file => file.endsWith('.json'));
            console.log("Found JSON files:", jsonFiles);
            
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(jsonFiles));
        });
        return;
    }
    
    if (filePath === './') {
        filePath = './index.html';
    }

    const extname = path.extname(filePath);
    let contentType = 'text/html';
    
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
        case '.jpeg':
            contentType = 'image/jpeg';
            break;
    }

    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                res.writeHead(404);
                res.end('File not found');
            } else {
                res.writeHead(500);
                res.end('Error: ' + error.code);
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
    console.log(`Open this URL in your browser to use the FMR Calculator`);
});

const http = require('http');
const url = require('url');
const port=3000;
const cors=require('cors');
const userController=require('./controllers/userController');


const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.writeHead(204).end();
    
    const { pathname } = url.parse(req.url);

    const parsedUrl = url.parse(req.url);
    
     if (pathname === '/users' && req.method==='GET' ) {  
        return userController.getUsers(req, res);
    }else if (pathname === '/users' && req.method==='POST') {
        return userController.addUser(req, res);
    }
});

server.listen(port,()=>{
    console.log(`app started on ${port}`)
});
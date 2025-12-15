const userService = require('../services/userService');

const getBody = (req) => {
    return new Promise((resolve) => {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => resolve(body));
    });
};

const getUsers = async (req, res) => {
    res.writeHead(200);
    let users = await userService.getAllUsers(req, res);
    res.end(users);
};

const addUser = async (req, res) => {
    const body = await getBody(req);
    console.log('body : ',body.user);
    let newUser =JSON.parse(body).user;
    let msg = await userService.addUser(req, res, newUser);
    res.end(msg);
}



module.exports = { getUsers, addUser };
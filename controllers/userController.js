const userService = require('../services/userService');
const hbs = require('handlebars');
const fs = require('fs');

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

    const template = (hbs.compile(fs.readFileSync('./view/index.hbs', 'utf8')));
    const html = template({ users: users });
    res.end(html);
};

const addUser = async (req, res) => {
    const body = await getBody(req);
    const params = new URLSearchParams(body);
    let newUser = {
        email: params.get('email'),
        name: params.get('name')
    }

    await userService.addUser(req, res, newUser);
}
const updateUser = async (req, res) => {
    const body = await getBody(req);
    const params = new URLSearchParams(body);
    const updateData = {
        id: params.get('id'),
        email: params.get('email'),
        name: params.get('name')
    }
    await userService.updateUser(req, res, updateData);
}
const deleteUser = async (req, res) => {
    const body = await getBody(req);
    const params = new URLSearchParams(body);
    const id = params.get('id');
    await userService.deleteUser(req, res, id);
}

module.exports = { getUsers, addUser, updateUser, deleteUser };
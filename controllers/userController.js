const userService = require('../services/userService');
const url = require('url');

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
    
    res.end(require('ejs').render(
  require('fs').readFileSync('./view/index.ejs', 'utf8'),
  {users: users}
));
};

const addUser = async (req, res) => {
    const body = await getBody(req);
    let newUser =JSON.parse(body);
    
    await userService.addUser(req, res, newUser);
}
const updateUser = async (req,res, id) =>{
    
const body = await getBody(req);
    const updateData = JSON.parse(body);
    await userService.updateUser(req, res, updateData);

}
const deleteUser = async (req,res, id) =>{
    const body = await getBody(req);
    
    await userService.deleteUser(req,res,{id: id});
}

module.exports = { getUsers, addUser,updateUser,deleteUser };
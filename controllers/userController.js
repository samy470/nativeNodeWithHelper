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
    res.end(users);
};

const addUser = async (req, res) => {
    const body = await getBody(req);
    let newUser =JSON.parse(body).user;
    console.log("new user",newUser);
    
    let msg = await userService.addUser(req, res, newUser);
    res.end(msg);
}
const updateUser = async (req,res) =>{
     
    const body = await getBody(req);
    console.log('body : ',body.user);
    let updatedUser = JSON.parse(body).user;
    console.log("updated user :" ,updatedUser);
    
    let msg = await userService.updateUser(req,res,updatedUser);
    res.end(msg)
}
const deleteUser = async (req,res) =>{
     
    const body = await getBody(req);
    let deleteUser = JSON.parse(body).user;
    let msg = await userService.deleteUser(req,res,deleteUser);
    res.end(msg)
}



module.exports = { getUsers, addUser,updateUser,deleteUser };
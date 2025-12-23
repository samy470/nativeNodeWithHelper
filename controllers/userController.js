const express = require('express');
const userService = require('../services/userService');
const hbs = require('handlebars');
const fs = require('fs');

const app = express();

const getUsers = async (req, res) => {
    let users = await userService.getAllUsers();
    res.render('index', { users: users });
};

const addUser = async (req, res) => {
    let newUser = {
        email: req.body.email,
        name: req.body.name
    }
    await userService.addUser(req, res, newUser);
}

const updateUser = async (req, res) => {
    const updateData = {
        id: req.body.id,
        email: req.body.email,
        name: req.body.name
    }
    await userService.updateUser(req, res, updateData);
}
const deleteUser = async (req, res) => {
    const id = req.body.id;
    await userService.deleteUser(req, res, id);
}

module.exports = { getUsers, addUser, updateUser, deleteUser };
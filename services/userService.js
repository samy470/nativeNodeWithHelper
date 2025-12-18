const fs = require('fs');
const path = require('path');


const getAllUsers = async (req, res) => {
    return new Promise((resolve, reject) => {
        fs.readFile('db.json', 'utf-8', (err, data) => {
            if (err) {
                reject("error reading file");
                return;
            }
            if (!data) {
                reject("no products");
                return;
            }

            const db = JSON.parse(data).users;
            let allData = [];
            if (db.length > 0) {
                allData = db
            }
            resolve(allData);
        });
    });
}

const addUser = async (req, res, userData) => {
    fs.readFile('db.json', 'utf-8', (err, data) => {
        if (err) {
            return res.writeHead(500).end(JSON.stringify({ message: "error writing file" }));
        }
        let db = JSON.parse(data);
        const userExists = db.users.find(user => user.email === userData.email);
        if (userExists) {
            return res.writeHead(400).end(JSON.stringify({ message: "user already exists" }));
        }

        const newUser = {
            id: parseInt(db.users[db.users.length - 1].id) + 1,
            email: userData.email,
            name: userData.name
        }
        db.users.push(newUser);
        fs.writeFile('db.json', JSON.stringify(db, null, 2), (err) => {
            return res.writeHead(201).end(JSON.stringify({ message: "user added successfully" }));
        });
    }
    )
}

const updateUser = async (req, res, updateData) => {
    fs.readFile('db.json', 'utf-8', (err, data) => {
        const { id } = p(req);
        let db = JSON.parse(data);
        const userIndex = db.users.findIndex(user => user.id == id);
        
        db.users[userIndex] = { ...db.users[userIndex], ...updateData };
        
        fs.writeFile('db.json', JSON.stringify(db, null, 2), (err) => {
            if (err) return res.writeHead(500).end(JSON.stringify({message: "error"}));
            res.writeHead(200).end(JSON.stringify({message: "updated"}));
        });
    });
}

const deleteUser = async (req, res) => {
    fs.readFile('db.json', 'utf-8', (err, data) => {
        const { id, q } = p(req);
        let db = {};
        if (data.trim() !== '') db = JSON.parse(data);
        const users = db.users || [];
        const filteredUsers = users.filter(user => user.id != id);
        db.users = filteredUsers;
        fs.writeFile('db.json', JSON.stringify(db, null, 2), (err) => {
            if (err) return res.writeHead(500).end(JSON.stringify({ message: "error writing file" }));
            res.writeHead(200).end(JSON.stringify({ message: "user deleted successfully" }));
        });
    })
}

// Super compact helper
const p = (req) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    console.log("this is the url :", url);
    const q = Object.fromEntries(url.searchParams);
    const m = req.url.match(/\/[^\/]+\/([^\/?]+)/);
    return { ...q, id: m?.[1] || q.id };
};

module.exports = { getAllUsers, addUser, updateUser, deleteUser };
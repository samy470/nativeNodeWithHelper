const fs = require('fs');

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
        if (data.trim() !== '') db = JSON.parse(data);
        const userExists = db.users.find(user => user.email === userData.email);
        if (userExists) {
            return res.writeHead(200).end(`
    <script>
        alert("User already exists");
        window.location.href = '/users';
    </script>
`);
        }

        const newUser = {
            id: parseInt(db.users[db.users.length - 1].id) + 1,
            email: userData.email,
            name: userData.name
        }
        db.users.push(newUser);
        fs.writeFile('db.json', JSON.stringify(db, null, 2), (err) => {
            return res.writeHead(302, { 'Location': '/users' }).end();
        });
    }
    )
}

const updateUser = async (req, res, updateData) => {
    fs.readFile('db.json', 'utf-8', (err, data) => {
        const id = updateData.id;
        let db = JSON.parse(data);
        const userIndex = db.users.findIndex(user => user.id == id);

        db.users[userIndex] = { ...db.users[userIndex], ...updateData };

        fs.writeFile('db.json', JSON.stringify(db, null, 2), (err) => {
            res.writeHead(302, { 'Location': '/users' }).end();
        });
    });
}

const deleteUser = async (req, res, id) => {
    fs.readFile('db.json', 'utf-8', (err, data) => {
        let db = {};
        if (data.trim() !== '') db = JSON.parse(data);
        const users = db.users || [];
        const filteredUsers = users.filter(user => user.id != id);
        db.users = filteredUsers;
        fs.writeFile('db.json', JSON.stringify(db, null, 2), (err) => {
            res.writeHead(302, { 'Location': '/users' }).end();
        });
    })
}

module.exports = { getAllUsers, addUser, updateUser, deleteUser };
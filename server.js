const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');
const url = require('url');

const app = express();
const port=3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());
const userController = require('./controllers/userController');

app.get('/users', userController.getUsers);
app.post('/users', userController.addUser);
app.post('/users/update', userController.updateUser);
app.post('/users/delete', userController.deleteUser);

app.set('view engine', 'hbs');
app.set('views', './view');
app.get('/', (req, res) => {
  res.render('index', { users });
});

app.use((req, res) => {
    res.status(404).json({ error: 'Not Found' });
});

app.listen(port,()=>{
    console.log(`app started on ${port}`)
});
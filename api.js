const express = require('express');
const app = express();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const candidates = require('./candidate.json').candidates;
const users = require('./user.json').user;

app.use(cors());
app.use(bodyParser.json());
require('dotenv').config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const PORT = process.env.SERVER_PORT || 8000;

const server = app.listen(PORT, () => {
    console.log(`Start Server : localhost:${PORT}`);
});

const verifyToken = (req, res, next) => {
    console.log('VerityToken Ing!!!');
    try {
        const clientToken = req.headers['authorization'];
        const decodedToken = jwt.verify(clientToken, JWT_SECRET_KEY);

        if (decodedToken){
            // res.locals.loginEmail = decoded.email;
            next();
        } else {
            res.status(401).send('Unauthorized');
        }
    } catch (err){
        res.status(401).send('Token Expired');
    }
};

app.get('/api/candidates', async (req, res) => {
    res.send(candidates);
});

app.get('/api/vote', verifyToken, async (req, res) => {
    let voteId = req.query.id;
    if(candidates[voteId]) {
        candidates[voteId].voteCount++;
        res.status(200).send(`Successfully Voted to ${candidates[voteId].name}`);
    } else {
        res.status(404).send('Candidate does not exist');
    }
});

app.post('/api/signup', async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let name = req.body.name;
    let loginUser = users.filter(user => user.email == email);
    try {
        if (email && password && name){
            if (loginUser.length){
                res.status(409).send('already exist Email');
            } else {
                users.push({
                    email: email,
                    password: password,
                    name: name
                });
                res.status(201).send('Succesfully Generated');
            }
        } else {
            res.status(400).send('Bad Request');
        }
    } catch (err){
        console.log('ERROR : ', err);
    }
});

app.post('/api/signin', async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let loginUser = users.filter(user => user.email == email);

    try {
        if (email && password){
            if (loginUser.length && loginUser[0].password == password){
                const token = jwt.sign({
                    email: email
                }, JWT_SECRET_KEY, {
                    expiresIn: '12h'
                });
        
                // res.cookie('user', token);
                res.status(201).send(token);
            } else {
                res.status(404).send('Login Failed');
            }
        } else {
            res.status(400).send('Bad Request');
        }
    } catch (err){
        console.log('ERROR : ', err);
    }
});


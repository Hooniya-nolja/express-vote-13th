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

// let candidates = [
//     {
//         id: 0,
//         name: '김선종',
//         voteCount: 120
//     },
//     {
//         id: 1,
//         name: '박예진',
//         voteCount: 160
//     },
//     {
//         id: 2,
//         name: '안건희',
//         voteCount: 200
//     },
//     {
//         id: 3,
//         name: '이승범',
//         voteCount: 132
//     },
//     {
//         id: 4,
//         name: '김영우',
//         voteCount: 186
//     },
//     {
//         id: 5,
//         name: '이호연',
//         voteCount: 154
//     },
//     {
//         id: 6,
//         name: '이소정',
//         voteCount: 199
//     },
//     {
//         id: 7,
//         name: '정윤선',
//         voteCount: 201
//     }
// ]

const PORT = process.env.SERVER_PORT || 8000;
const server = app.listen(PORT, () => {
    console.log(`Start Server : localhost:${PORT}`);
});

app.get('/api/candidates', async (req, res) => {
    res.send(candidates);
});

app.get('/api/vote', async (req, res) => {
    let voteId = req.query.id;
    if(candidates[voteId]) {
        // console.log('Before voteCount : ', candidates[voteId - 1].voteCount);
        candidates[voteId].voteCount++;
        // console.log('After voteCount : ', candidates[voteId - 1].voteCount);
        res.status(200).send(`Successfully Voted to ${candidates[voteId].name}`);
    } else {
        res.status(404).send('Candidate does not exist');
    }
});

app.post('/api/signup', async (req, res) => {
    try {
        console.log('body : ', req.body);

        let email = req.body.email;
        let password = req.body.password;
        let name = req.body.name;

        if (email && password && name){
            let userLogin = users.filter(user => user.email == email);

            if (userLogin.length){
                console.log('users : ', users);
                res.status(409).send('already exist Email');
            } else {
                users.push({
                    email: email,
                    password: password,
                    name: name
                });
                console.log('users : ', users);
                res.status(201).send('Succesfully Generated');
            }
        } else {
            res.status(400).send('Bad Request');
        }
    } catch (err){
        console.log('ERROR : ', err);
    }
});
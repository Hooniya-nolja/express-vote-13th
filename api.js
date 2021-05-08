const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());

const serverPort = 8000;
let candidates = [
    {
        id: 0,
        name: '김선종',
        voteCount: 120
    },
    {
        id: 1,
        name: '박예진',
        voteCount: 160
    },
    {
        id: 2,
        name: '안건희',
        voteCount: 200
    },
    {
        id: 3,
        name: '이승범',
        voteCount: 132
    },
    {
        id: 4,
        name: '김영우',
        voteCount: 186
    },
    {
        id: 5,
        name: '이호연',
        voteCount: 154
    },
    {
        id: 6,
        name: '이소정',
        voteCount: 199
    },
    {
        id: 7,
        name: '정윤선',
        voteCount: 201
    }
]

const server = app.listen(serverPort, () => {
    console.log(`Start Server : localhost:${serverPort}`);
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
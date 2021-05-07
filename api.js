const express = require('express');
const app = express();

const serverPort = 3001;
const candidates = [
    {
        id: 1,
        name: '김선종',
        voteCount: 120
    },
    {
        id: 2,
        name: '박예진',
        voteCount: 160
    },
    {
        id: 3,
        name: '안건희',
        voteCount: 200
    }
]

const server = app.listen(serverPort, () => {
    console.log(`Start Server : localhost:${serverPort}`);
});

app.get('/api/candidates', async (req, res) => {
    res.send(candidates);
});
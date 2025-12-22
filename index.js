const express = require('express');
const path = require('path');
const app = express();

// Set high limits so large inventories don't crash the server
app.use(express.json({ limit: '20mb' }));

let players = {}; 

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/api/data', (req, res) => res.json(players));

app.post('/update', (req, res) => {
    const d = req.body;
    if (d && d.playerName) {
        players[d.playerName] = d;
        res.status(200).send("Sync OK");
    } else {
        res.status(400).send("Invalid Data");
    }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server live on port ${PORT}`));

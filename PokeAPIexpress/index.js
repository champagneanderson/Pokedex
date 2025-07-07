const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(cors());


app.get('/pokemon/:name', async (req, res) => {
    
    try {
        const { name } = req.params;
        const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
        res.json({
            name: data.name,
            id: data.id,
            image: data.sprites.front_default,
            height: data.height,
            weight: data.weight,
            types: data.types.map(t => t.type.name),
            moves: data.moves.slice(0, 10).map(m => m.move.name),
        });
    } catch (error) {
        res.status(404).json({ error: 'Pokemon not found' });
    }

});

 app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
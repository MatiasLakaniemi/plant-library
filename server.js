const express = require('express');
const path = require('path');
const { db, initDatabase } = require('./database');

const app = express();
app.use(express.json());

app.use(express.static(path.join(__dirname)));

// Alusta tietokanta
initDatabase();


// GET /plants - Hae kaikki kasvit
app.get('/plants', (req, res) => {
  db.all('SELECT * FROM plants', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// GET /plants/:id - Hae yksittäinen kasvi
app.get('/plants/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM plants WHERE id = ?', [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: 'Kasvia ei löytynyt' });
    }
    res.json(row);
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🌿 Kasvikirjasto API käynnissä portissa ${PORT}`);
});

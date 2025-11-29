const express = require('express');
const { db, initDatabase } = require('./database');

const app = express();
app.use(express.json());

// Alusta tietokanta
initDatabase();

// Hae kaikki kasvit
app.get('/plants', (req, res) => {
  db.all('SELECT * FROM plants', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Hae yksi kasvi ID:n perusteella
app.get('/plants/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM plants WHERE id = ?', [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Kasvia ei löytynyt' });
    res.json(row);
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Kasvikirjasto API käynnissä portissa ${PORT}`);
});

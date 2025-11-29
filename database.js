const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./plants.db');

function initDatabase() {
  db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS plants (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      species TEXT NOT NULL,
      location TEXT,
      watering_frequency TEXT,
      notes TEXT
    )`);

    db.get('SELECT COUNT(*) as count FROM plants', [], (err, row) => {
      if (err) {
        console.error('Virhe:', err);
        return;
      }

      if (row.count === 0) {
        const plants = [
          ['Monstera', 'Monstera deliciosa', 'Olohuone ikkuna', 'Kerran viikossa', 'Kasvaa hyvin'],
          ['Rauhanlilja', 'Spathiphyllum', 'Makuuhuone', 'Kahdesti viikossa', 'Pitää varjosta'],
          ['Kaktus', 'Echinopsis', 'Keittiö', 'Kerran kuussa', 'Kastele harvoin'],
          ['Orkidea', 'Phalaenopsis', 'Kylpyhuone', 'Kerran viikossa', 'Vaatii kosteutta'],
          ['Joulutähti', 'Euphorbia pulcherrima', 'Olohuone pöytä', 'Kahdesti viikossa', 'Ei pidä vedosta']
        ];

        const stmt = db.prepare('INSERT INTO plants (name, species, location, watering_frequency, notes) VALUES (?, ?, ?, ?, ?)');
        plants.forEach(plant => stmt.run(plant));
        stmt.finalize();

        console.log('Testikasvit lisätty!');
      }
    });
  });
}

module.exports = { db, initDatabase };
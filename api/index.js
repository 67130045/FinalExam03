const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

async function waitForDB() {
  let connected = false;
  let retryCount = 0;

  while (!connected && retryCount < 10) {
    try {
      await pool.query(`
        CREATE TABLE IF NOT EXISTS \`references\` (
          id INT AUTO_INCREMENT PRIMARY KEY,
          title TEXT NOT NULL,
          pdf_url TEXT NOT NULL
        )
      `);
      console.log('✅ Connected to DB and table ready');
      connected = true;
    } catch (err) {
      retryCount++;
      console.log(`⏳ Waiting for DB... retrying (${retryCount})`);
      await new Promise(res => setTimeout(res, 3000));
    }
  }

  if (!connected) {
    console.error('❌ Could not connect to database after several tries.');
    process.exit(1);
  }
}

async function main() {
  await waitForDB();

  // Routes
  app.get('/references', async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT * FROM `references`');
      res.json(rows);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch references' });
    }
  });

  app.post('/references', async (req, res) => {
    try {
      const { title, pdf_url } = req.body;
      await pool.query('INSERT INTO `references` (title, pdf_url) VALUES (?, ?)', [title, pdf_url]);
      res.status(201).json({ message: 'Added' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to add reference' });
    }
  });

  app.put('/references/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { title, pdf_url } = req.body;
      await pool.query('UPDATE `references` SET title = ?, pdf_url = ? WHERE id = ?', [title, pdf_url, id]);
      res.json({ message: 'Updated' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to update reference' });
    }
  });

  app.delete('/references/:id', async (req, res) => {
    try {
      const { id } = req.params;
      await pool.query('DELETE FROM `references` WHERE id = ?', [id]);
      res.json({ message: 'Deleted' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to delete reference' });
    }
  });

  app.listen(3000, '0.0.0.0', () => {
    console.log('🚀 API running at http://0.0.0.0:3000');
  });
}

main();

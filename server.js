const express = require('express');
const mariadb = require('mariadb');

const app = express();
const port = 3000;
app.use(express.json());


// Create a MariaDB pool
const pool = mariadb.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'sample',
  port: 3306,
  connectionLimit: 10,
});

app.get('/agents', async (req, res) => {
  try {
   
    const connection = await pool.getConnection();
    const rows = await connection.query('SELECT * FROM agents');
    connection.release();
    res.json(rows);
  } catch (err) {
    console.error('Error executing SQL query:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get('/company', async (req, res) => {
  try {
   
    const connection = await pool.getConnection();
    const rows = await connection.query('SELECT * FROM company');
    connection.release();
    res.json(rows);
  } catch (err) {
    console.error('Error executing SQL query:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/customer', async (req, res) => {
  try {
  
    const connection = await pool.getConnection();
    const rows = await connection.query('SELECT * FROM customer');
    connection.release();
    res.json(rows);
  } catch (err) {
    console.error('Error executing SQL query:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/company', async (req, res) => {
  console.log(req.body);
  try {
    const { company_id, company_name, company_city } = req.body;

   
    if (!company_id || !company_name || !company_city) {
      return res.status(400).json({ error: 'All fields are required' });
    }

 
    const connection = await pool.getConnection();
    const result = await connection.query(
      'INSERT INTO company (COMPANY_ID, COMPANY_NAME, COMPANY_CITY) VALUES (?, ?, ?)',
      [company_id, company_name, company_city]
    );
    connection.release();

    res.status(201).json({ message: 'Company created successfully' });
  } catch (err) {
    console.error('Error creating company:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


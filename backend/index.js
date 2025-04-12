import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
// import fs from 'fs';

const DB_HOST='db-mysql-nyc3-77807-do-user-20581125-0.l.db.ondigitalocean.com'
const DB_USER='doadmin'
const DB_NAME='store'

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// eslint-disable-next-line no-undef
if (!process.env.DB_PW) {
    console.error('❌ Error: DB_PW environment variable is not set.');
    console.error('👉 Please run: export DB_PW=your_database_password');
    // eslint-disable-next-line no-undef
    process.exit(1); // Exit the app to avoid accidental connection attempts
}

// Database connection
const db = mysql.createConnection({
    host: DB_HOST,
    port: 25060,
    user: DB_USER,
    // eslint-disable-next-line no-undef
    password: process.env.DB_PW,
    database: DB_NAME,
    ssl: {
        rejectUnauthorized: false
    }
});

// Test route
app.get('/api', (req, res) => {
    // res.send('Customers route is working!');
    db.query('SELECT * FROM store.Customer', (err, results) => {
        if (err) {
            console.error('Error querying database:', err);
            return res.status(500).json({ error: 'Database query failed' });
        }
        res.json(results);
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Server is running at http://localhost:${PORT}/api`);
});
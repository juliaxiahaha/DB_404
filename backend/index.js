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
    console.error('Error: DB_PW environment variable is not set.');
    console.error('Please run: export DB_PW=your_database_password');
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
//SELECT
//select customer
app.get('/api', (req, res) => {
    // Execute both queries in parallel using Promise.all
    const customerQuery = new Promise((resolve, reject) => {
        db.query('SELECT * FROM store.Customer', (err, c_results) => {
            if (err) {
                console.error('Error querying database for customers:', err);
                return reject({ error: 'Database query failed for customers' });
            }
            resolve(c_results);
        });
    });

    const productQuery = new Promise((resolve, reject) => {
        db.query('SELECT * FROM store.Product', (err, p_results) => {
            if (err) {
                console.error('Error querying database for products:', err);
                return reject({ error: 'Database query failed for products' });
            }
            resolve(p_results);
        });
    });

    // Use Promise.all to wait for both queries to complete
    Promise.all([customerQuery, productQuery])
        .then(([c_results, p_results]) => {
            // Send the combined results after both queries are done
            res.json({
                customers: c_results,
                products: p_results
            });
        })
        .catch((error) => {
            // If any of the queries failed, return an error response
            res.status(500).json(error);
        });
});


app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}/api`);
});

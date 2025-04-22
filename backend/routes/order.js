// routes/customer.js
import express from 'express';

const router = express.Router();

export default function (db) {
    // GET all customers
    router.get('/all', async (req, res) => {
        const customerQuery = new Promise((resolve, reject) => {
            db.query('SELECT * FROM store.Customer', (err, c_results) => {
                if (err) {
                    console.error('Error querying database for customers:', err);
                    return reject({ error: 'Database query failed for customers' });
                }
                resolve(c_results);
            });
        });

        try {
            const customers = await customerQuery;
            res.json({ customers });
        } catch (err) {
            res.status(500).json(err);
        }
    });

    return router;
}

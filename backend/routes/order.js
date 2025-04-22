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

    // POST /create → Create a new customer
    router.post('/create', async (req, res) => {
        const { name, email, phone } = req.body;
        if (!name || !email || !phone) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const insertQuery = new Promise((resolve, reject) => {
            db.query(
                'INSERT INTO store.Customer (name, email, phone) VALUES (?, ?, ?)',
                [name, email, phone],
                (err, result) => {
                    if (err) {
                        console.error('Error inserting customer:', err);
                        return reject({ error: 'Insert failed' });
                    }
                    resolve({ message: 'Customer created', id: result.insertId });
                }
            );
        });

        try {
            const response = await insertQuery;
            res.json(response);
        } catch (err) {
            res.status(500).json(err);
        }
    });

    // PUT /update/:id → Update a customer
    router.put('/update/:id', async (req, res) => {
        const { name, email, phone } = req.body;
        const id = req.params.id;

        const updateQuery = new Promise((resolve, reject) => {
            db.query(
                'UPDATE store.Customer SET name = ?, email = ?, phone = ? WHERE id = ?',
                [name, email, phone, id],
                (err, result) => {
                    if (err) {
                        console.error('Error updating customer:', err);
                        return reject({ error: 'Update failed' });
                    }
                    resolve({ message: 'Customer updated' });
                }
            );
        });

        try {
            const response = await updateQuery;
            res.json(response);
        } catch (err) {
            res.status(500).json(err);
        }
    });

    // DELETE /delete/:id → Delete a customer
    router.delete('/delete/:id', async (req, res) => {
        const id = req.params.id;

        const deleteQuery = new Promise((resolve, reject) => {
            db.query(
                'DELETE FROM store.Customer WHERE id = ?',
                [id],
                (err, result) => {
                    if (err) {
                        console.error('Error deleting customer:', err);
                        return reject({ error: 'Delete failed' });
                    }
                    resolve({ message: 'Customer deleted' });
                }
            );
        });

        try {
            const response = await deleteQuery;
            res.json(response);
        } catch (err) {
            res.status(500).json(err);
        }
    });

    return router;
}

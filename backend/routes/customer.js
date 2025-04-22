import express from 'express';

const router = express.Router();

export default function (db) {
    // GET all customers
    router.get('/all', async (req, res) => {
        try {
            db.query('SELECT * FROM store.Customer', (err, results) => {
                if (err) {
                    console.error('Error querying customers:', err);
                    return res.status(500).json({ error: 'Database query failed' });
                }
                res.json({ customers: results });
            });
        } catch (err) {
            res.status(500).json(err);
        }
    });

    // POST /create - Create a new customer
    router.post('/create', async (req, res) => {
        const { name, email, phone } = req.body;
        if (!name || !email || !phone) {
            return res.status(400).json({ error: 'Missing customer fields' });
        }

        db.query(
            'INSERT INTO store.Customer (name, email, phone) VALUES (?, ?, ?)',
            [name, email, phone],
            (err, result) => {
                if (err) {
                    console.error('Error creating customer:', err);
                    return res.status(500).json({ error: 'Failed to create customer' });
                }
                res.json({ message: 'Customer created', customerId: result.insertId });
            }
        );
    });

    // PUT /update/:id - Update a customer
    router.put('/update/:id', async (req, res) => {
        const { name, email, phone } = req.body;
        const id = req.params.id;

        db.query(
            'UPDATE store.Customer SET name = ?, email = ?, phone = ? WHERE id = ?',
            [name, email, phone, id],
            (err, result) => {
                if (err) {
                    console.error('Error updating customer:', err);
                    return res.status(500).json({ error: 'Failed to update customer' });
                }
                res.json({ message: 'Customer updated' });
            }
        );
    });

    // DELETE /delete/:id - Delete a customer
    router.delete('/delete/:id', async (req, res) => {
        const id = req.params.id;

        db.query('DELETE FROM store.Customer WHERE id = ?', [id], (err, result) => {
            if (err) {
                console.error('Error deleting customer:', err);
                return res.status(500).json({ error: 'Failed to delete customer' });
            }
            res.json({ message: 'Customer deleted' });
        });
    });

    return router;
}

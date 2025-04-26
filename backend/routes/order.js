import express from 'express';
import { authenticateToken, authorizeRoles } from './authentication.js';
const router = express.Router();

router.use(authenticateToken);

export default function (db) {
    // Get all orders
    router.get('/orders', (req, res) => {
        db.query('SELECT * FROM Orders', (err, results) => {
            if (err) {
                console.error('Failed to fetch orders:', err);
                return res.status(500).json({ error: 'Failed to fetch orders' });
            }
            res.json(results);
        });
    });

    // Add a new order
    router.post('/', authorizeRoles('Developer', 'Manager'), (req, res) => {
        const { order_date, total_price, status, employee, customer_name } = req.body;
        const query = 'INSERT INTO Orders (order_date, total_price, status, employee, customer_name) VALUES (?, ?, ?, ?, ?)';
        db.query(query, [order_date, total_price, status, employee, customer_name], (err, result) => {
            if (err) {
                console.error('Failed to add order:', err);
                return res.status(500).json({ error: 'Insert failed' });
            }
            res.status(201).json({ message: 'Order added successfully', id: result.insertId });
        });
    });

    // Update an order by ID
    router.put('/:id', authorizeRoles('Developer', 'Manager'), (req, res) => {
        const { id } = req.params;
        const { order_date, total_price, status, employee, customer_name } = req.body;
        const query = 'UPDATE Orders SET order_date = ?, total_price = ?, status = ?, employee = ?, customer_name = ? WHERE Order_ID = ?';
        db.query(query, [order_date, total_price, status, employee, customer_name, id], (err) => {
            if (err) {
                console.error('Failed to update order:', err);
                return res.status(500).json({ error: 'Update failed' });
            }
            res.json({ message: 'Order updated successfully' });
        });
    });

    // Delete an order by ID
    router.delete('/:id', authorizeRoles('Developer', 'Manager'), (req, res) => {
        const { id } = req.params;
        db.query('DELETE FROM Orders WHERE Order_ID = ?', [id], (err) => {
            if (err) {
                console.error('Failed to delete order:', err);
                return res.status(500).json({ error: 'Delete failed' });
            }
            res.json({ message: 'Deleted successfully' });
        });
    });

    return router;
}

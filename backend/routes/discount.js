import express from 'express';
import { authenticateToken, authorizeRoles } from './authentication.js';
const router = express.Router();

router.use(authenticateToken);

export default function(db) {

    // Get all discounts
    router.get('/discounts', (req, res) => {
        db.query('SELECT * FROM Discount', (err, results) => {
            if (err) {
                console.error('Failed to fetch discounts:', err);
                return res.status(500).json({error: 'Failed to fetch discounts'});
            }
            res.json(results);
        });
    });

    // Delete a discount by ID
    router.delete('/:id', authorizeRoles('Developer', 'Manager'), (req, res) => {
        const {id} = req.params;
        db.query('DELETE FROM Discount WHERE Discount_ID = ?', [id], (err) => {
            if (err) {
                console.error('Failed to delete discount:', err);
                return res.status(500).json({error: 'Delete failed'});
            }
            res.json({message: 'Deleted successfully'});
        });
    });

    // Update a discount by ID
    router.put('/:id', authorizeRoles('Developer', 'Manager'), (req, res) => {
        const { id } = req.params;
        const { discount_type, discount_value, start_date, end_date } = req.body;
        const query = 'UPDATE Discount SET discount_type = ?, discount_value = ?, start_date = ?, end_date = ? WHERE Discount_ID = ?';
        db.query(query, [discount_type, discount_value, start_date, end_date, id], (err) => {
            if (err) {
                console.error('Failed to update discount:', err);
                return res.status(500).json({ error: 'Update failed' });
            }
            res.json({ message: 'Discount updated successfully' });
        });
    });

    // Add a new discount
    router.post('/', authorizeRoles('Developer', 'Manager'), (req, res) => {
        const { discount_type, discount_value, start_date, end_date } = req.body;
        const query = 'INSERT INTO Discount (discount_type, discount_value, start_date, end_date) VALUES (?, ?, ?, ?)';
        db.query(query, [discount_type, discount_value, start_date, end_date], (err, result) => {
            if (err) {
                console.error('Failed to add discount:', err);
                return res.status(500).json({ error: 'Insert failed' });
            }
            res.status(201).json({ message: 'Discount added successfully', id: result.insertId });
        });
    });

    return router;
}
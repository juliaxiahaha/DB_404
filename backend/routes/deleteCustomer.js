// src/routes/deleteCustomer.js
import express from 'express';
const router = express.Router();

export default function(db) {
    // DELETE /api/customers/123
    router.delete('/:id', (req, res) => {
        const victimId = parseInt(req.params.id, 10);
        if (isNaN(victimId)) {
            return res.status(400).json({ error: 'Invalid customer ID' });
        }

        db.query('CALL DeleteCustomer(?)', [victimId], (err, results) => {
            if (err) {
                console.error('DeleteCustomer failed：', err);
                return res.status(500).json({ error: 'DeleteCustomer failed' });
            }
            res.json({ message: `Customer ${victimId} deleted`, results });
        });
    });

    return router;
}

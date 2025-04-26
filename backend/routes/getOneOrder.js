// src/routes/getOneOrder.js
import express from 'express';
const router = express.Router();

export default function (db) {
    router.get('/:id', (req, res) => {
        const orderId = req.params.id;

        db.query(
            'SELECT * FROM OrderDetail WHERE Order_ID = ?',
            [orderId],
            (err, results) => {
                if (err) {
                    console.error('Failed to retrieve order detail:', err);
                    return res.status(500).json({ error: 'Failed to retrieve order detail' });
                }

                if (results.length === 0) {
                    return res.status(404).json({ error: 'No details found for this Order ID' });
                }

                res.json(results);
            }
        );
    });

    return router;
}

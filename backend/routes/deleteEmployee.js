// src/routes/deleteEmployee.js
import express from 'express';
import { authenticateToken, authorizeRoles } from './authentication.js';
const router = express.Router();

router.use(authenticateToken);

export default function(db) {
    // DELETE /api/employees/:id
    router.delete('/:id', authorizeRoles('Developer', 'Manager'), (req, res) => {
        const empId = parseInt(req.params.id, 10);
        if (isNaN(empId)) {
            return res.status(400).json({ error: 'Invalid Employee ID' });
        }

        db.query('CALL DeleteEmployee(?)', [empId], (err, results) => {
            if (err) {
                console.error('DeleteEmployee failed:', err);
                return res.status(500).json({ error: 'DeleteEmployee failed' });
            }
            res.json({ message: `Employee ${empId} deleted`, results });
        });
    });

    return router;
}

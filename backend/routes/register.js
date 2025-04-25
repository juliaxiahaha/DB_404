// src/routes/register.js
import express from 'express';
const router = express.Router();

export default function(db) {
    // POST /api/auth/register
    router.post('/register', (req, res) => {
        const { username, password, role } = req.body;
        console.log(username, password);
        if (!username || !password) {
            return res.status(400).json({ error: 'Missing username or password' });
        }

        const sql = 'CALL AddNewUser(?, ?, ?)';

        db.query(sql, [username, password, role || 'Employee'], (err, results) => {
            if (err) {
                console.error('AddNewUser failed:', err);
                return res.status(500).json({ error: 'User creation failed', detail: err.sqlMessage });
            }

            res.json({ message: `User ${username} created`, role: role || 'Employee' });
        });
    });

    return router;
}
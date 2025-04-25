// src/routes/login.js
import express from 'express';
const router = express.Router();

export default function(db) {
    // POST /api/auth/login
    router.put('/login', (req, res) => {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'Missing username or password' });
        }

        const sql = 'SELECT check_user_credentials(?, ?) AS is_valid';

        db.query(sql, [username, password], (err, results) => {
            if (err) {
                console.error('Login check failed:', err);
                return res.status(500).json({ error: 'Login check failed' });
            }

            const isValid = results[0]?.is_valid === 1;

            res.json({ success: isValid });
        });
    });

    return router;
}

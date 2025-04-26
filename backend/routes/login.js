// src/routes/login.js
import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

export default function(db) {
    // PUT /api/auth/login
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

            if (!isValid) {
                return res.json({ success: false });
            }

            // Fetch the role after successful login
            const getUserSql = 'SELECT username, role FROM users WHERE username = ?';
            db.query(getUserSql, [username], (err2, userResults) => {
                if (err2) {
                    console.error('Failed to fetch user role:', err2);
                    return res.status(500).json({ error: 'Failed to fetch user role' });
                }

                if (userResults.length === 0) {
                    return res.status(404).json({ error: 'User not found after login' });
                }
                console.log('Login successful:', {
                    username: userResults[0].username,
                    role: userResults[0].role
                });

                const userPayload = {
                    username: userResults[0].username,
                    role: userResults[0].role
                };

                console.log("Loaded JWT_SECRET:", process.env.JWT_SECRET);

                const token = jwt.sign(userPayload, process.env.JWT_SECRET, { expiresIn: '1h' });

                return res.json({
                    success: true,
                    token
                });

            });
        });
    });

    return router;
}

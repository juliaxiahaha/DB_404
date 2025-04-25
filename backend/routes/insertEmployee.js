// src/routes/insertEmployee.js
import express from 'express';
const router = express.Router();

const toNullable = v => v === undefined || v === '' ? null : v;

export default function(db) {
    // POST /api/employees/insert
    router.post('/insert', (req, res) => {
        const {
            new_Employee_ID,
            new_basic_salary,
            new_annual_bonus,
            new_Employee_name
        } = Object.fromEntries(
            Object.entries(req.body).map(([k, v]) => [k, toNullable(v)])
        );

        const id = parseInt(new_Employee_ID, 10);
        if (isNaN(id)) {
            return res.status(400).json({ error: 'Invalid Employee ID' });
        }

        const sql = 'CALL InsertEmployee(?, ?, ?, ?)';
        const params = [
            new_Employee_ID,      // new_Employee_ID
            new_basic_salary,     // new_basic_salary
            new_annual_bonus,      // new_annual_bonus
            new_Employee_name
        ];

        db.query(sql, params, (err, results) => {
            if (err) {
                console.error('InsertEmployee failed:', err);
                return res.status(500).json({ error: 'InsertEmployee failed' });
            }
            res.json({
                message: `Employee ${id} inserted`,
                results
            });
        });
    });

    return router;
}

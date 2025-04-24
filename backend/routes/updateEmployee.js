// src/routes/updateEmployee.js
import express from 'express';
const router = express.Router();

const toNullable = v => (v === undefined || v === '' ? null : v);

export default function(db) {
    // PUT /api/employees/update
    router.put('/update', (req, res) => {
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

        const sql = 'CALL UpdateEmployee(?, ?, ?)';
        const params = [id, new_basic_salary, new_annual_bonus, new_Employee_name,];

        db.query(sql, params, (err, results) => {
            if (err) {
                console.error('UpdateEmployee failed:', err);
                return res.status(500).json({ error: 'UpdateEmployee failed' });
            }
            res.json({ message: `Employee ${id} updated`, results });
        });
    });

    return router;
}

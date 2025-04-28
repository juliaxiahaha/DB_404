// src/routes/getEmployees.js
import express from 'express';
const router = express.Router();

const toNullable = v => v === undefined || v === '' ? null : v;

export default function(db) {
    // GET /api/employees
    router.get('/', (req, res) => {
        db.query('SELECT * FROM Employee', (err, results) => {
            if (err) {
                console.error('Failed to retrieve employees:', err);
                return res.status(500).json({ error: 'Failed to retrieve employees' });
            }
            res.json(results);
        });
    });

    // DELETE /api/employees/:id
    router.delete('/:id', (req, res) => {
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

        const sql = 'CALL UpdateEmployee(?, ?, ?, ?)';
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

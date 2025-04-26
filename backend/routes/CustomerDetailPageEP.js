import express from 'express';
const router = express.Router();

const toNullable = v => v === undefined || v === '' ? null : v;

export default function(db) {
    // GET /api/customers/:id
    router.get('/single/:id', (req, res) => {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).json({ error: 'Invalid customer ID' });
        }

        db.query('CALL GetCustomerByID(?)', [id], (err, results) => {
            if (err) {
                console.error('GetCustomerByID failed:', err);
                return res.status(500).json({ error: 'Database error' });
            }

            res.json(results[0][0]); // first result set, first row
        });
    });

    // GET /api/shoppingCarts/:customerId
    router.get('/:customerId', (req, res) => {
        const customerId = parseInt(req.params.customerId, 10);

        if (isNaN(customerId)) {
            return res.status(400).json({ error: 'Invalid Customer ID' });
        }

        db.query('CALL GetShoppingCartByCustomerID(?)', [customerId], (err, results) => {
            if (err) {
                console.error('GetShoppingCartByCustomerID failed:', err);
                return res.status(500).json({ error: 'Database error' });
            }

            res.json(results[0]); // return result set
        });
    });

    router.put('/update', (req, res) => {
        const {
            new_Customer_ID,
            new_name,
            new_address,
            new_phone,
            new_email,
            new_membership_registration_date
        } = Object.fromEntries(
            Object.entries(req.body).map(([k, v]) => [k, toNullable(v)])
        );

        const id = parseInt(new_Customer_ID, 10);
        if (isNaN(id)) {
            return res.status(400).json({ error: 'Invalid Customer ID' });
        }

        const sql = 'CALL UpdateCustomer(?, ?, ?, ?, ?, ?)';
        const params = [
            id,
            new_name,
            new_address,
            new_phone,
            new_email,
            new_membership_registration_date
        ];

        db.query(sql, params, (err, results) => {
            if (err) {
                console.error('UpdateCustomer failed:', err);
                return res.status(500).json({ error: 'UpdateCustomer failed' });
            }
            res.json({
                message: `Customer ${id} updated`,
                results
            });
        });
    });

    return router;
}
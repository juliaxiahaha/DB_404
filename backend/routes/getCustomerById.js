import express from 'express';
import { authenticateToken } from './authentication.js';
const router = express.Router();
router.use(authenticateToken);

export default function(db) {
  // GET /api/customers/:id
  router.get('/:id', (req, res) => {
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

  return router;
}
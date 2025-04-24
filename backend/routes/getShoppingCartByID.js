import express from 'express';
const router = express.Router();

export default function(db) {
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

  return router;
}

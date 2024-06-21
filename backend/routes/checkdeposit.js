const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const { getDB } = require('../config/db');
const { ObjectId } = require('mongodb');

// @route    POST api/check-deposit
// @desc     Deposit check money
// @access   Private
router.post(
  '/',
  [
    auth,
    [
      check('accountType', 'Account type is required').isIn(['savings', 'checking']),
      check('amount', 'Amount is required').isFloat({ gt: 0 }),
      check('checkImage', 'Check image is required').not().isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { accountType, amount, checkImage } = req.body;

    try {
      const db = await getDB();
      const user = await db.collection('users').findOne({ _id: new ObjectId(req.user.id) });

      if (accountType === 'savings') {
        user.savingsBalance += parseFloat(amount);
      } else {
        user.checkingBalance += parseFloat(amount);
      }

      await db.collection('users').updateOne({ _id: new ObjectId(req.user.id) }, { $set: user });

      const transaction = {
        userId: req.user.id,
        type: 'deposit',
        accountType,
        amount: parseFloat(amount),
        checkImage,
        date: new Date().toISOString()  // Store the date and time in ISO format
      };

      await db.collection('transactions').insertOne(transaction);

      res.json({ msg: 'Check deposit successful' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;

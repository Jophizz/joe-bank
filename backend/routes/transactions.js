const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const { getDB } = require('../config/db');
const { ObjectId } = require('mongodb');

// @route    POST api/transactions/deposit
// @desc     Deposit money
// @access   Private
router.post(
  '/deposit',
  [
    auth,
    [
      check('accountType', 'Account type is required').isIn(['savings', 'checking']),
      check('amount', 'Amount is required').isFloat({ gt: 0 })
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { accountType, amount } = req.body;

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
        date: new Date().toISOString()  // Store the date and time in ISO format
      };

      await db.collection('transactions').insertOne(transaction);

      res.json({ msg: 'Deposit successful' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route    POST api/transactions/withdraw
// @desc     Withdraw money
// @access   Private
router.post(
  '/withdraw',
  [
    auth,
    [
      check('accountType', 'Account type is required').isIn(['savings', 'checking']),
      check('amount', 'Amount is required').isFloat({ gt: 0 })
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { accountType, amount } = req.body;

    try {
      const db = await getDB();
      const user = await db.collection('users').findOne({ _id: new ObjectId(req.user.id) });

      if (accountType === 'savings') {
        if (user.savingsBalance < amount) {
          return res.status(400).json({ msg: 'Insufficient balance' });
        }
        user.savingsBalance -= parseFloat(amount);
      } else {
        if (user.checkingBalance < amount) {
          return res.status(400).json({ msg: 'Insufficient balance' });
        }
        user.checkingBalance -= parseFloat(amount);
      }

      await db.collection('users').updateOne({ _id: new ObjectId(req.user.id) }, { $set: user });

      const transaction = {
        userId: req.user.id,
        type: 'withdraw',
        accountType,
        amount: parseFloat(amount),
        date: new Date().toISOString()  // Store the date and time in ISO format
      };

      await db.collection('transactions').insertOne(transaction);

      res.json({ msg: 'Withdraw successful' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route    GET api/transactions
// @desc     Get all transactions
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const db = await getDB();
    console.log('Fetching transactions for user:', req.user.id);
    const transactions = await db.collection('transactions').find({ userId: new ObjectId(req.user.id) }).toArray();
    console.log('Transactions found:', transactions);
    res.json(transactions);
  } catch (err) {
    console.error('Error fetching transactions:', err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
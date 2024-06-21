const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getDB } = require('../config/db');
const { ObjectId } = require('mongodb');

// @route    POST api/deposit
// @desc     Deposit money
// @access   Private
router.post('/', auth, async (req, res) => {
  const { amount, accountType } = req.body;
  try {
    const db = await getDB();
    const updateField = accountType === 'savings' ? 'savingsBalance' : 'checkingBalance';
    const update = { $inc: { [updateField]: amount } };
    await db.collection('users').updateOne({ _id: ObjectId(req.user.id) }, update);
    res.json({ msg: 'Deposit successful' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getDB } = require('../config/db');
const { ObjectId } = require('mongodb');

// @route    GET api/balance
// @desc     Get user balance
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const db = await getDB();
    const user = await db.collection('users').findOne({ _id: new ObjectId(req.user.id) }, { projection: { savingsBalance: 1, checkingBalance: 1 } });
    res.json({ savingsBalance: user.savingsBalance, checkingBalance: user.checkingBalance });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;

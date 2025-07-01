// backend/src/api/routes/loyalty.routes.js
const express = require('express');
const router = express.Router();

/**
 * @route GET /api/loyalty/status
 * @desc Get user's loyalty program status
 * @access Private
 */
router.get('/status', (req, res) => {
  try {
    // Placeholder for getting loyalty status logic
    res.send({
      current_tier: 'Silver',
      points: 1250,
      points_to_next_tier: 750,
      next_tier: 'Gold',
      tier_benefits: [
        { name: 'Weekly Cashback', value: '5%' },
        { name: 'Birthday Bonus', value: '₹1,000' },
        { name: 'Dedicated Support', value: 'Yes' }
      ],
      next_tier_benefits: [
        { name: 'Weekly Cashback', value: '10%' },
        { name: 'Birthday Bonus', value: '₹2,500' },
        { name: 'Dedicated Support', value: 'Yes' },
        { name: 'Monthly Free Bet', value: '₹500' }
      ],
      tiers: [
        { name: 'Bronze', points_required: 0 },
        { name: 'Silver', points_required: 1000 },
        { name: 'Gold', points_required: 2000 },
        { name: 'Platinum', points_required: 5000 },
        { name: 'Diamond', points_required: 10000 }
      ]
    });
  } catch (error) {
    res.status(401).send({ message: 'Not authorized' });
  }
});

/**
 * @route GET /api/loyalty/history
 * @desc Get user's loyalty points history
 * @access Private
 */
router.get('/history', (req, res) => {
  try {
    // Placeholder for getting loyalty history logic
    res.send([
      {
        id: 'lp1',
        points: 150,
        type: 'earned',
        reason: 'Sports bet placed',
        transaction_reference: 'BET123456',
        timestamp: new Date(Date.now() - 86400000).toISOString() // 1 day ago
      },
      {
        id: 'lp2',
        points: 500,
        type: 'earned',
        reason: 'Monthly deposit bonus',
        transaction_reference: 'DEP123456',
        timestamp: new Date(Date.now() - 604800000).toISOString() // 7 days ago
      },
      {
        id: 'lp3',
        points: 100,
        type: 'redeemed',
        reason: 'Free bet reward',
        transaction_reference: 'RED123456',
        timestamp: new Date(Date.now() - 1209600000).toISOString() // 14 days ago
      }
    ]);
  } catch (error) {
    res.status(401).send({ message: 'Not authorized' });
  }
});

module.exports = router;
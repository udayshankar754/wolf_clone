// backend/src/api/routes/promotions.routes.js
const express = require('express');
const router = express.Router();

/**
 * @route GET /api/promotions
 * @desc Get all promotions
 * @access Public
 */
router.get('/', (req, res) => {
  try {
    // Placeholder for getting all promotions logic
    res.send([
      {
        id: 'promo1',
        title: 'Welcome Bonus',
        description: 'Get 100% bonus up to ₹10,000 on your first deposit',
        image: 'welcome_bonus.jpg',
        start_date: new Date(Date.now() - 2592000000).toISOString(), // 30 days ago
        end_date: new Date(Date.now() + 2592000000).toISOString(), // 30 days ahead
        category: 'deposit',
        is_featured: true
      },
      {
        id: 'promo2',
        title: 'IPL Special',
        description: 'Get a free bet of ₹500 on IPL matches',
        image: 'ipl_special.jpg',
        start_date: new Date(Date.now() - 1296000000).toISOString(), // 15 days ago
        end_date: new Date(Date.now() + 1296000000).toISOString(), // 15 days ahead
        category: 'sports',
        sport_id: 'cricket',
        league_id: 'ipl',
        is_featured: true
      },
      {
        id: 'promo3',
        title: 'Casino Cashback',
        description: '10% cashback up to ₹2,000 on casino losses',
        image: 'casino_cashback.jpg',
        start_date: new Date(Date.now() - 604800000).toISOString(), // 7 days ago
        end_date: new Date(Date.now() + 604800000).toISOString(), // 7 days ahead
        category: 'casino'
      }
    ]);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

/**
 * @route GET /api/promotions/:id
 * @desc Get specific promotion details
 * @access Public
 */
router.get('/:id', (req, res) => {
  try {
    // Placeholder for getting promotion details logic
    res.send({
      id: req.params.id,
      title: 'Welcome Bonus',
      description: 'Get 100% bonus up to ₹10,000 on your first deposit',
      detailed_description: `
        <h2>Welcome to Wolf777!</h2>
        <p>We're excited to have you join us. To give you a head start, we're offering a 100% match on your first deposit up to ₹10,000.</p>
        <h3>How it works:</h3>
        <ol>
          <li>Make your first deposit between ₹1,000 and ₹10,000</li>
          <li>We'll instantly credit your account with a matching bonus</li>
          <li>Meet the wagering requirements to convert bonus to real cash</li>
        </ol>
      `,
      image: 'welcome_bonus.jpg',
      banner: 'welcome_bonus_banner.jpg',
      start_date: new Date(Date.now() - 2592000000).toISOString(),
      end_date: new Date(Date.now() + 2592000000).toISOString(),
      category: 'deposit',
      is_featured: true,
      terms_and_conditions: [
        'Minimum deposit of ₹1,000 required',
        'Maximum bonus amount is ₹10,000',
        'Bonus has 10x wagering requirement',
        'Wagering must be completed within 30 days',
        'Only available for new users'
      ],
      how_to_claim: 'Automatically credited after making your first deposit',
      eligible: true // User eligibility for this promotion
    });
  } catch (error) {
    res.status(404).send({ message: 'Promotion not found' });
  }
});

/**
 * @route POST /api/promotions/claim/:id
 * @desc Claim a promotion
 * @access Private
 */
router.post('/claim/:id', (req, res) => {
  try {
    // Placeholder for claiming promotion logic
    res.send({
      promotion_id: req.params.id,
      claimed_at: new Date().toISOString(),
      bonus_amount: 5000,
      wagering_requirement: 50000,
      expiry_date: new Date(Date.now() + 2592000000).toISOString(), // 30 days ahead
      status: 'active'
    });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

/**
 * @route GET /api/promotions/active
 * @desc Get user's active promotions
 * @access Private
 */
router.get('/active', (req, res) => {
  try {
    // Placeholder for getting active promotions logic
    res.send([
      {
        promotion_id: 'promo1',
        title: 'Welcome Bonus',
        claimed_at: new Date(Date.now() - 604800000).toISOString(), // 7 days ago
        bonus_amount: 5000,
        wagering_requirement: 50000,
        wagering_completed: 25000,
        expiry_date: new Date(Date.now() + 1987200000).toISOString(), // 23 days ahead
        status: 'active'
      },
      {
        promotion_id: 'promo2',
        title: 'IPL Special',
        claimed_at: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
        free_bet_amount: 500,
        expiry_date: new Date(Date.now() + 432000000).toISOString(), // 5 days ahead
        status: 'active'
      }
    ]);
  } catch (error) {
    res.status(401).send({ message: 'Not authorized' });
  }
});

module.exports = router;
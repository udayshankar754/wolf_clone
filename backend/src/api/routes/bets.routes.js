// backend/src/api/routes/bets.routes.js
const express = require('express');
const router = express.Router();

/**
 * @route POST /api/bets
 * @desc Place a new bet
 * @access Private
 */
router.post('/', (req, res) => {
  try {
    // Placeholder for bet placement logic
    res.status(201).send({
      id: 'bet123',
      selections: req.body.selections || [],
      stake: req.body.stake || 100,
      potential_winnings: req.body.potential_winnings || 180,
      odds: req.body.odds || 1.8,
      placed_at: new Date().toISOString(),
      status: 'accepted'
    });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

/**
 * @route GET /api/bets
 * @desc Get user's bet history
 * @access Private
 */
router.get('/', (req, res) => {
  try {
    // Placeholder for getting bets logic
    res.send([
      {
        id: 'bet123',
        selections: [
          {
            event_id: 'match1',
            event_name: 'Mumbai Indians vs Chennai Super Kings',
            market_id: 'market1',
            market_name: 'Match Winner',
            selection_id: 'sel1',
            selection_name: 'Mumbai Indians',
            odds: 2.1
          }
        ],
        stake: 100,
        potential_winnings: 210,
        placed_at: new Date(Date.now() - 86400000).toISOString(),
        status: 'won',
        settled_at: new Date(Date.now() - 70000000).toISOString()
      },
      {
        id: 'bet124',
        selections: [
          {
            event_id: 'match2',
            event_name: 'Royal Challengers Bangalore vs Delhi Capitals',
            market_id: 'market1',
            market_name: 'Match Winner',
            selection_id: 'sel3',
            selection_name: 'Royal Challengers Bangalore',
            odds: 1.9
          }
        ],
        stake: 200,
        potential_winnings: 380,
        placed_at: new Date().toISOString(),
        status: 'open'
      }
    ]);
  } catch (error) {
    res.status(401).send({ message: 'Not authorized' });
  }
});

/**
 * @route GET /api/bets/:id
 * @desc Get details of a specific bet
 * @access Private
 */
router.get('/:id', (req, res) => {
  try {
    // Placeholder for getting bet details logic
    res.send({
      id: req.params.id,
      selections: [
        {
          event_id: 'match1',
          event_name: 'Mumbai Indians vs Chennai Super Kings',
          market_id: 'market1',
          market_name: 'Match Winner',
          selection_id: 'sel1',
          selection_name: 'Mumbai Indians',
          odds: 2.1
        }
      ],
      stake: 100,
      potential_winnings: 210,
      placed_at: new Date(Date.now() - 86400000).toISOString(),
      status: 'open'
    });
  } catch (error) {
    res.status(404).send({ message: 'Bet not found' });
  }
});

/**
 * @route POST /api/bets/cashout/:id
 * @desc Cash out a bet
 * @access Private
 */
router.post('/cashout/:id', (req, res) => {
  try {
    // Placeholder for cashout logic
    res.send({
      id: req.params.id,
      original_stake: 100,
      original_potential_winnings: 210,
      cashout_amount: 120,
      cashout_time: new Date().toISOString(),
      status: 'cashed_out'
    });
  } catch (error) {
    res.status(400).send({ message: 'Cashout failed' });
  }
});

module.exports = router;
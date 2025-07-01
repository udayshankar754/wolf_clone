// backend/src/api/routes/odds.routes.js
const express = require('express');
const router = express.Router();

/**
 * @route GET /api/odds/event/:id
 * @desc Get odds for a specific event
 * @access Public
 */
router.get('/event/:id', (req, res) => {
  try {
    // Placeholder for getting event odds logic
    res.send({
      event_id: req.params.id,
      markets: [
        {
          id: 'market1',
          name: 'Match Winner',
          selections: [
            { 
              id: 'sel1', 
              name: 'Mumbai Indians', 
              odds: { 
                decimal: 2.10, 
                fractional: '11/10', 
                indo: '+110' 
              } 
            },
            { 
              id: 'sel2', 
              name: 'Chennai Super Kings', 
              odds: { 
                decimal: 1.75, 
                fractional: '3/4', 
                indo: '-133' 
              } 
            }
          ]
        },
        {
          id: 'market2',
          name: 'Total Runs (Over/Under)',
          selections: [
            { 
              id: 'sel3', 
              name: 'Over 180.5', 
              odds: { 
                decimal: 1.90, 
                fractional: '9/10', 
                indo: '-111' 
              } 
            },
            { 
              id: 'sel4', 
              name: 'Under 180.5', 
              odds: { 
                decimal: 1.90, 
                fractional: '9/10', 
                indo: '-111' 
              } 
            }
          ]
        }
      ],
      last_updated: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = router;
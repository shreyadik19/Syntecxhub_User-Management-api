// routes/userRoutes.js
const express = require('express');
const router = express.Router();

// Temporary simple routes - we'll fix later
router.get('/', (req, res) => {
    res.json({ 
        message: 'Users route is working!',
        users: [
            { id: 1, name: 'John Doe' },
            { id: 2, name: 'Jane Smith' }
        ]
    });
});

router.post('/', (req, res) => {
    res.json({ 
        message: 'User created (temporary)',
        user: req.body 
    });
});

router.get('/:id', (req, res) => {
    res.json({ 
        message: `User ${req.params.id} details`,
        id: req.params.id 
    });
});

module.exports = router;
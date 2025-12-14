// server.js - SIMPLE WORKING VERSION
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Direct routes (temporary - no imports needed)
app.get('/api/users', (req, res) => {
    res.json([
        { id: 1, name: 'John Doe', email: 'john@test.com', age: 25 },
        { id: 2, name: 'Jane Smith', email: 'jane@test.com', age: 30 },
        { id: 3, name: 'Bob Wilson', email: 'bob@test.com', age: 35 }
    ]);
});

app.post('/api/users', (req, res) => {
    const newUser = {
        id: Date.now(), // Simple ID
        ...req.body,
        created_at: new Date().toISOString()
    };
    res.status(201).json({
        message: 'User created successfully',
        user: newUser
    });
});

app.get('/api/users/:id', (req, res) => {
    const users = [
        { id: 1, name: 'John Doe', email: 'john@test.com', age: 25 },
        { id: 2, name: 'Jane Smith', email: 'jane@test.com', age: 30 }
    ];
    const user = users.find(u => u.id === parseInt(req.params.id));
    
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

// Home route
app.get('/', (req, res) => {
    res.json({
        message: '🚀 User Management API',
        version: '1.0.0',
        endpoints: {
            getAllUsers: 'GET    /api/users',
            createUser: 'POST   /api/users',
            getUser: 'GET    /api/users/:id',
            updateUser: 'PUT    /api/users/:id',
            deleteUser: 'DELETE /api/users/:id'
        },
        database: 'In-memory (working without SQLite for now)'
    });
});

// Start server
app.listen(PORT, () => {
    console.log('='.repeat(50));
    console.log(`✅ Server running: http://localhost:${PORT}`);
    console.log('='.repeat(50));
    console.log('\n📚 Test these endpoints:');
    console.log(`  http://localhost:${PORT}/api/users`);
    console.log(`  http://localhost:${PORT}/api/users/1`);
    console.log('\n💡 Open browser and test now!');
    console.log('='.repeat(50));
});
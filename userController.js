// controllers/userController.js
const User = require('../models/User');

class UserController {
    // Create new user
    async createUser(req, res) {
        try {
            const userData = req.body;
            
            // Validate required fields
            if (!userData.name || !userData.email || !userData.age) {
                return res.status(400).json({ 
                    error: 'Name, email, and age are required' 
                });
            }

            const user = await User.create(userData);
            res.status(201).json({
                message: 'User created successfully',
                user
            });
        } catch (error) {
            if (error.message.includes('UNIQUE')) {
                return res.status(400).json({ 
                    error: 'Email already exists' 
                });
            }
            res.status(500).json({ error: error.message });
        }
    }

    // Get all users
    async getAllUsers(req, res) {
        try {
            const users = await User.findAll();
            res.json(users);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Get single user
    async getUserById(req, res) {
        try {
            const user = await User.findById(req.params.id);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Update user
    async updateUser(req, res) {
        try {
            const result = await User.update(req.params.id, req.body);
            if (result.changes === 0) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.json({ 
                message: 'User updated successfully',
                changes: result.changes 
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Delete user
    async deleteUser(req, res) {
        try {
            const result = await User.delete(req.params.id);
            if (result.changes === 0) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.json({ 
                message: 'User deleted successfully',
                changes: result.changes 
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Search users
    async searchUsers(req, res) {
        try {
            const users = await User.search(req.params.keyword);
            res.json(users);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new UserController();
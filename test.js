console.log('Testing project structure...');

// Test 1: Check required modules
try {
    const express = require('express');
    const cors = require('cors');
    console.log('✅ All modules installed');
} catch (err) {
    console.log('❌ Missing modules:', err.message);
}

// Test 2: Check file structure
const fs = require('fs');
const requiredFiles = [
    'server.js',
    'package.json',
    'config/database.js',
    'models/User.js',
    'controllers/userController.js',
    'routes/userRoutes.js'
];

console.log('\n📁 Checking file structure:');
requiredFiles.forEach(file => {
    if (fs.existsSync(file)) {
        console.log(`✅ ${file}`);
    } else {
        console.log(`❌ ${file} - MISSING`);
    }
});

console.log('\n🎯 Ready to run: node server.js');
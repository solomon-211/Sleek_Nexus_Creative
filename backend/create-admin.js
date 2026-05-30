const axios = require('axios');
require('dotenv').config();

const createAdmin = async () => {
    try {
        const response = await axios.post(process.env.ADMIN_SETUP_URL || 'http://localhost:5000/api/admin/setup', {
            name: process.env.ADMIN_NAME || 'Admin User',
            email: process.env.ADMIN_EMAIL || 'admin@codebridge.ss',
            password: process.env.ADMIN_PASSWORD || 'ChangeMe123!',
            setupKey: process.env.ADMIN_SETUP_KEY || 'codebridge_setup_2024'
        });
        
        console.log('[OK] Admin created successfully!');
        console.log('Response:', JSON.stringify(response.data, null, 2));
    } catch (error) {
        if (error.code === 'ECONNREFUSED') {
            console.error('[ERROR] Error: Backend server is not running!');
            console.error('Start the server first: node server.js');
        } else if (error.response) {
            console.error('[ERROR] Server Error:', error.response.status);
            console.error('Message:', error.response.data);
        } else {
            console.error('[ERROR] Error:', error.message);
        }
    }
};

createAdmin();

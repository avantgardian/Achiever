// API Configuration
// Automatically detects localhost vs production

const API_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:3000'  // Local development
    : 'https://YOUR-RAILWAY-APP.up.railway.app';  // TODO: Replace with your Railway URL

// Export for use in other files
window.API_URL = API_URL;


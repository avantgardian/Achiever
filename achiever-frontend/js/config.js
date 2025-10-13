// API Configuration
// Automatically detects localhost vs production

const API_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:3000'  // Local development
    : 'https://achiever-production.up.railway.app';  // Production backend

// Export for use in other files
window.API_URL = API_URL;


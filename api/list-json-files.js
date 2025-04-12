const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  // Set CORS headers to allow requests from any origin
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle OPTIONS request (preflight)
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  try {
    // Get the root directory where the function is being executed
    const rootDir = process.cwd();
    
    console.log('List JSON files endpoint called at path:', req.url);
    console.log('Current working directory:', rootDir);
    
    // List directory contents for debugging
    const dirContents = fs.readdirSync(rootDir);
    console.log('Directory contents:', dirContents);
    
    // Read all the files in the root directory
    const files = fs.readdirSync(rootDir);
    
    // Filter to include JSON files for payment standards and utility allowance
    const jsonFiles = files.filter(file => {
        // Check if it's a JSON file
        if (!file.endsWith('.json')) return false;
        
        // Check for various naming patterns
        const isPaymentStandard = 
            file.includes('_payment_standards_') || 
            file.includes('_payment_standards') ||
            file.includes('payment_standards_');
            
        const isUtilityAllowance = 
            file.includes('_utility_allowance_') || 
            file.includes('_utility_allowance') ||
            file.includes('utility_allowance_');
            
        return isPaymentStandard || isUtilityAllowance;
    });
    
    console.log('Found JSON files:', jsonFiles);
    
    // Return the list of JSON files
    res.status(200).json(jsonFiles);
  } catch (error) {
    console.error('Error listing files:', error);
    res.status(500).json({ error: 'Failed to list files', message: error.message });
  }
};

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
    // Log all files first for debugging
    console.log('All files in directory:', files);
    
    const jsonFiles = files.filter(file => {
        // Log each file we're checking
        console.log('Checking file:', file);
        
        // Check if it's a JSON file
        if (!file.endsWith('.json')) {
            console.log(`${file} - Not a JSON file, skipping`);
            return false;
        }
        
        // Convert to lowercase for case-insensitive matching
        const lowerFile = file.toLowerCase();
        
        // Check payment standard patterns, with and without year suffix
        const paymentPatterns = [
            'payment_standards_2025',
            'payment_standards', 
            'payment-standards'
        ];
        const isPaymentStandard = paymentPatterns.some(pattern => lowerFile.includes(pattern));
        
        // Check utility allowance patterns, with and without year suffix
        const utilityPatterns = [
            'utility_allowance_2025',
            'utility_allowance', 
            'utility-allowance'
        ];
        const isUtilityAllowance = utilityPatterns.some(pattern => lowerFile.includes(pattern));
        
        const result = isPaymentStandard || isUtilityAllowance;
        console.log(`${file} - Is payment: ${isPaymentStandard}, Is utility: ${isUtilityAllowance}, Include: ${result}`);
        
        return result;
    });
    
    console.log('Found JSON files:', jsonFiles);
    
    // Return the list of JSON files
    res.status(200).json(jsonFiles);
  } catch (error) {
    console.error('Error listing files:', error);
    res.status(500).json({ error: 'Failed to list files', message: error.message });
  }
};

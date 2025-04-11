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
    const jsonFiles = files.filter(file => 
        file.endsWith('.json') && 
        (file.includes('_payment_standards_') || 
         file.includes('_utility_allowance_')));
    
    console.log('Found JSON files:', jsonFiles);
    
    // Return the list of JSON files
    res.status(200).json(jsonFiles);
  } catch (error) {
    console.error('Error listing files:', error);
    res.status(500).json({ error: 'Failed to list files', message: error.message });
  }
};

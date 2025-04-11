# Section 8 FMR Calculator

A universal calculator for determining Section 8 Fair Market Rent eligibility based on location, utility allowances, and tenant income.

## Features

- Universal calculator that works with any county data
- Auto-detection of available states and counties from JSON files
- Payment standards by zip code
- Utility allowance deductions
- Automatic calculations for FMR eligibility
- Recommended RFTA rent amount calculation
- Support for multiple counties with different data formats
- Responsive design

## Running the Application

### Locally

To run the application locally:

1. Make sure you have Node.js installed on your system
2. Open a terminal in the project directory
3. Run the server:

```
node server.js
```

4. Open your browser and navigate to: http://localhost:3000

### Deployment on Vercel

This application is configured for easy deployment on Vercel:

1. Push the repository to GitHub
2. Connect your Vercel account to your GitHub repository
3. Import the project in Vercel
4. Deploy without any additional configuration (the vercel.json file handles routing)

## File Structure

- `index.html` - Main universal calculator interface
- `server.js` - Simple Node.js server for local development
- `api/list-json-files.js` - Serverless function for listing JSON files on Vercel
- `vercel.json` - Configuration for Vercel deployment
- County-specific files (for backward compatibility):
  - `cleveland.html` - Cleveland, OH calculator
  - `montgomery.html` - Montgomery, AL calculator
- County data files:
  - `cuyahoga_OH_payment_standards_2025.json` - Payment standards for Cuyahoga County, OH
  - `cuyahoga_OH_utility_allowance_2025.json` - Utility allowances for Cuyahoga County, OH
  - `montgomery_AL_payment_standards_2025.json` - Payment standards for Montgomery, AL
  - `montgomery_AL_utility_allowance_2025.json` - Utility allowances for Montgomery, AL

## Adding New Counties

Adding a new county is now much simpler:

1. Create two JSON files following the naming convention:
   - `{county}_{state}_payment_standards_2025.json` - Payment standards
   - `{county}_{state}_utility_allowance_2025.json` - Utility allowances
2. Upload the files to the root directory
3. The calculator will automatically detect the new county and add it to the dropdown menus

No code changes are required for adding new counties. The system automatically detects all available counties from the JSON filenames.

## Data Format

### Payment Standards JSON

Payment standards should be structured with zip codes as the top-level keys, and each zip code containing bedroom counts as keys:

```json
{
  "44017": {
    "0": 1068.0,
    "1": 1212.0,
    "2": 1464.0,
    "3": 1884.0,
    "4": 2016.0
  },
  "44022": {
    "0": 1440.0,
    "1": 1620.0,
    ...
  }
}
```

### Utility Allowance JSON

The calculator supports multiple utility allowance formats:

#### Simple Format (Montgomery style)
```json
{
  "heating": {
    "0": 23,
    "1": 27,
    "2": 33,
    "3": 37,
    "4": 44
  },
  "cooking": {
    "0": 10,
    "1": 11,
    ...
  }
}
```

#### Complex Format (Cuyahoga style)
```json
{
  "SPACE HEAT (natural gas)": {
    "1 Single-family dwelling": [
      56, 58, 60, 62, 64, 66, 68, 70, 72
    ],
    ...
  },
  ...
}
```

The calculator detects and handles both formats automatically.

## Notes

- The universal calculator automatically loads data when a county is selected
- The calculator provides a recommended RFTA rent amount, which is the maximum possible rent that would be approved
- County and state information is parsed from JSON filenames, so naming is important

const os = require('os');
const fs = require('fs');
const path = require('path');

const homeDirectory = os.homedir(); 
const hostname = os.hostname();
const networkInterfaces = os.networkInterfaces();

console.log("Home Directory:", homeDirectory);
console.log("Hostname:", hostname);
console.log("Network Interfaces:", networkInterfaces);

const environmentVariables = process.env;

console.log("Environment Variables:", environmentVariables);

function saveEnvironmentVariables() {
    const logDirectory = path.join(homeDirectory, 'logs'); 
    const filePath = path.join(logDirectory, 'env-details.json');

    const envDetails = {
        homeDirectory,
        hostname,
        networkInterfaces,
        environmentVariables
    };

    if (!fs.existsSync(logDirectory)) {
        fs.mkdirSync(logDirectory, { recursive: true });
    }

    fs.writeFile(filePath, JSON.stringify(envDetails, null, 2), (err) => {
        if (err) {
            console.error('Error writing to file:', err);
        } else {
            console.log('Environment details saved to', filePath);
        }
    });
}

try {
    saveEnvironmentVariables();
} catch (error) {
    console.error('An error occurred:', error.message);
}
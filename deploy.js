const { ethers } = require('ethers');
const fs = require('fs');
const path = require('path');

// Setup Ethers.js with Ganache
const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:7545');

// Load the compiled contract
const contractPath = path.resolve(__dirname, 'build', 'EmployeeIncentive.json');

try {
    const { abi, bytecode } = JSON.parse(fs.readFileSync(contractPath, 'utf8'));

    (async () => {
        try {
            // Get a signer from the provider
            const signers = await ethers.getSigners();
            const signer = signers[0];

            console.log('Deploying contract from account:', signer.address);

            // Create a contract factory
            const factory = new ethers.ContractFactory(abi, bytecode, signer);

            // Deploy the contract
            const contract = await factory.deploy();
            await contract.deployTransaction.wait();

            console.log('Contract deployed at address:', contract.address);
        } catch (error) {
            console.error('Error during contract deployment:', error);
        }
    })();
} catch (error) {
    console.error('Error reading or parsing contract file:', error);
}

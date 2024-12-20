const express = require('express');
const { ethers } = require('ethers');

const app = express();
const port = 3000;

// Contract ABI
const contractABI = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "employee",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "IncentivePaid",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_employeeAddress",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_id",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "_name",
                "type": "string"
            }
        ],
        "name": "addEmployee",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "employeeAddresses",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "employees",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "incentive",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getAllEmployees",
        "outputs": [
            {
                "internalType": "address[]",
                "name": "",
                "type": "address[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_employeeAddress",
                "type": "address"
            }
        ],
        "name": "getEmployee",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_employeeAddress",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_amount",
                "type": "uint256"
            }
        ],
        "name": "payIncentive",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

// Contract address
const contractAddress = "0x56a2777e796eF23399e9E1d791E1A0410a75E31b"; // Replace with your deployed contract address

// Initialize provider and signer (Ganache setup)
const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:7545");
const privateKey = "0x61351195fbf80fa678b60c90348cee9a39db50bfeceb56251e356658a33004f1"; // Replace with your Ganache account private key
const signer = new ethers.Wallet(privateKey, provider);

// Initialize contract instance
const contract = new ethers.Contract(contractAddress, contractABI, signer);

// Middleware for parsing JSON
app.use(express.json());

// Endpoint to add an employee
app.post('/add-employee', async (req, res) => {
    const { employeeAddress, id, name } = req.body;
    try {
        const tx = await contract.addEmployee(employeeAddress, id, name);
        await tx.wait();
        res.status(200).send('Employee added successfully');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Endpoint to pay incentive
app.post('/pay-incentive', async (req, res) => {
    const { employeeAddress, amount } = req.body;
    try {
        const tx = await contract.payIncentive(employeeAddress, ethers.utils.parseEther(amount.toString()));
        await tx.wait();
        res.status(200).send('Incentive paid successfully');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Endpoint to get employee details
app.get('/employee/:address', async (req, res) => {
    const employeeAddress = req.params.address;
    try {
        const employee = await contract.getEmployee(employeeAddress);
        res.status(200).json({
            id: employee[0].toString(),
            name: employee[1],
            incentive: ethers.utils.formatEther(employee[2].toString())
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

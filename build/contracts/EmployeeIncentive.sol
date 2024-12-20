// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EmployeeIncentive {
    address public owner;

    struct Employee {
        uint256 id;
        string name;
        uint256 incentive;
    }

    mapping(address => Employee) public employees;
    address[] public employeeAddresses;

    event IncentivePaid(address indexed employee, uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function addEmployee(address _employeeAddress, uint256 _id, string memory _name) public onlyOwner {
        require(employees[_employeeAddress].id == 0, "Employee already exists");
        employees[_employeeAddress] = Employee(_id, _name, 0);
        employeeAddresses.push(_employeeAddress);
    }

    function payIncentive(address _employeeAddress, uint256 _amount) public onlyOwner {
        require(employees[_employeeAddress].id != 0, "Employee does not exist");
        employees[_employeeAddress].incentive += _amount;
        emit IncentivePaid(_employeeAddress, _amount);
    }

    function getEmployee(address _employeeAddress) public view returns (uint256, string memory, uint256) {
        require(employees[_employeeAddress].id != 0, "Employee does not exist");
        Employee memory emp = employees[_employeeAddress];
        return (emp.id, emp.name, emp.incentive);
    }

    function getAllEmployees() public view returns (address[] memory) {
        return employeeAddresses;
    }
}

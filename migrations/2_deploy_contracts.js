const EmployeeIncentive = artifacts.require("EmployeeIncentive");

module.exports = function (deployer) {
  deployer.deploy(EmployeeIncentive);
};

const UserAuthentication = artifacts.require("UserAuthentication");

module.exports = function (deployer) {
  deployer.deploy(UserAuthentication);
};

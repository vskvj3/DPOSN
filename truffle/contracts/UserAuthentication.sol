// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract UserAuthentication {
    struct userData {
        address userAddress;
        bytes email;
        bytes32 password;
        bytes32 firstName;
        bytes32 lastName;
        bytes32 dateOfBirth;
        bytes32 gender;
    }

    mapping(address => userData) accounts;

    function registerUser(
        address _userAddress,
        bytes calldata _email,
        bytes32 _password,
        bytes32 _firstName,
        bytes32 _lastName,
        bytes32 _dateOfBirth,
        bytes32 _gender
    ) public {
        require(
            accounts[_userAddress].userAddress != msg.sender,
            "User already registered"
        );
        accounts[msg.sender] = userData({
            userAddress: msg.sender,
            email: _email,
            password: _password,
            firstName: _firstName,
            lastName: _lastName,
            dateOfBirth: _dateOfBirth,
            gender: _gender
        });
    }

    function getUser() public view returns (userData memory) {
        return accounts[msg.sender];
    }

    function loginUser() public view returns (bytes memory, bytes32) {
        userData memory user = accounts[msg.sender];
        return (user.email, user.password);
    }
}

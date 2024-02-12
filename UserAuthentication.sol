// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract UserAuthentication {
    struct userData {
        address userAddress;
        string email;
        string password;
        string firstName;
        string lastName;
        string dateOfBirth;
        string gender;
    }

    mapping(address => userData) accounts;

    function registerUser(
        address _userAddress,
        string memory _email,
        string memory _password,
        string memory _firstName,
        string memory _lastName,
        string memory _dateOfBirth,
        string memory _gender
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

    function loginUser() public view returns (string memory, string memory) {
        userData memory user = accounts[msg.sender];
        return (user.email, user.password);
    }
}

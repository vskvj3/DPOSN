// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract SocialNetwork {
    struct userData {
        address userAddress;
        string imageCID;
        bytes32 userName;
        bytes32 firstName;
        bytes32 lastName;
        bytes32 dateOfBirth;
        bytes32 status;
    }

    mapping(address => userData) accounts;

    function registerUser(
        address _userAddress,
        string memory _imageCID,
        bytes32 _userName,
        bytes32 _firstName,
        bytes32 _lastName,
        bytes32 _dateOfBirth,
        bytes32 _status
    ) public {
        require(
            accounts[_userAddress].userAddress != msg.sender,
            "User already registered"
        );
        accounts[msg.sender] = userData({
            userAddress: msg.sender,
            imageCID: _imageCID,
            userName: _userName,
            firstName: _firstName,
            lastName: _lastName,
            dateOfBirth: _dateOfBirth,
            status: _status
        });
    }

    function getUser() public view returns (userData memory) {
        return accounts[msg.sender];
    }

    function loginUser() public view returns (bool) {
        require(
            accounts[msg.sender].userAddress != address(0),
            "user doesn't exist"
        );
        return true;
    }
}

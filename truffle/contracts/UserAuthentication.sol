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
        require(accounts[_userAddress].userAddress != msg.sender);
        accounts[_userAddress].userAddress = _userAddress;
        accounts[_userAddress].email = _email;
        accounts[_userAddress].password = _password;
        accounts[_userAddress].firstName = _firstName;
        accounts[_userAddress].lastName = _lastName;
        accounts[_userAddress].dateOfBirth = _dateOfBirth;
        accounts[_userAddress].gender = _gender;
    }

    function getUser(
        address userAddress
    ) public view returns (userData memory) {
        return accounts[userAddress];
    }

    function loginUser(
        address _userAddress,
        string memory _email,
        string memory _password
    )
        public
        view
        returns (
            string memory _firstName,
            string memory _lastName,
            string memory _dateOfBirth,
            string memory _gender
        )
    {
        bool isUserRegistered = ((accounts[_userAddress].userAddress ==
            msg.sender) &&
            (keccak256(abi.encodePacked(accounts[_userAddress].email)) ==
                keccak256(abi.encodePacked(_email))) &&
            (keccak256(abi.encodePacked(accounts[_userAddress].password)) ==
                keccak256(abi.encodePacked(_password))));
        require(isUserRegistered == true);
        return (
            accounts[_userAddress].firstName,
            accounts[_userAddress].lastName,
            accounts[_userAddress].dateOfBirth,
            accounts[_userAddress].gender
        );
    }
}

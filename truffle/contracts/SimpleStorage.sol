// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;


contract SimpleStorage {

  struct userData{
    address useraddress;
    string fname;
    string lname;
    string dob;
    string gender;
  }

  constructor(){

  }

  mapping(address => userData) accounts;

  function addUser(userData memory data) public {
    accounts[msg.sender] = data;
  }

  function returnUser() public view returns (userData memory) {
    return accounts[msg.sender];
  }



}

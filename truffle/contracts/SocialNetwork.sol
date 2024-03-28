// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract SocialNetwork {
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //  User Authentication Section                                                                                     //
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

    address[] public userAddresses;

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
        userAddresses.push(_userAddress);
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

    function getAllUsers() public view returns (address[] memory) {
        return userAddresses;
    }

    function getUser(
        address userAddress
    ) public view returns (userData memory) {
        require(
            abi.encodePacked(accounts[msg.sender].userAddress).length > 0,
            "user doesn't exist"
        );
        return accounts[userAddress];
    }

    function loginUser() public view returns (bool) {
        require(
            accounts[msg.sender].userAddress != address(0),
            "user doesn't exist"
        );
        return true;
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //  Post and Comment Section                                                                                        //
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    struct post {
        address userAddress;
        string postCID;
    }

    // string[] postList;
    // mapping(string => post) postData;

    // function addPost(string memory _PostCID) public {
    //     require(
    //         accounts[msg.sender].userAddress == msg.sender,
    //         "User doesn't exist"
    //     );
    //     postList.push(_PostCID);
    //     postData[_PostCID] = post({
    //         userAddress: msg.sender,
    //         postCID: _PostCID,
    //         commentCID: ""
    //     });
    // }

    post[] allPostData;
    mapping(string => string) allComments;

    function addPost(string memory _PostCID) public {
        require(
            accounts[msg.sender].userAddress == msg.sender,
            "User doesn't exist"
        );
        allPostData.push(post({userAddress: msg.sender, postCID: _PostCID}));
    }

    function addComment(
        string memory _postCID,
        string memory _CommentCID
    ) public {
        require(
            accounts[msg.sender].userAddress == msg.sender,
            "User doesn't exist"
        );
        allComments[_postCID] = _CommentCID;
    }

    function getPosts() public view returns (post[] memory) {
        require(
            accounts[msg.sender].userAddress == msg.sender,
            "User doesn't exist"
        );
        return allPostData;
    }

    function getComment(
        string memory _postCID
    ) public view returns (string memory) {
        require(
            accounts[msg.sender].userAddress == msg.sender,
            "User doesn't exist"
        );

        require(
            abi.encodePacked(allComments[_postCID]).length > 0,
            "No comments"
        );

        return allComments[_postCID];
    }
}

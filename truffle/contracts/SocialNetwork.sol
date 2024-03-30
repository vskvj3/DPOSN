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
        address[] followers;
        address[] following;
        uint followersCount;
        uint followingCount;
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
            status: _status,
            followers: new address[](0),
            following: new address[](0),
            followersCount: 0,
            followingCount: 0
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
    mapping(string => string) allLikes;
    mapping(string => string) allReports;

    // post section
    function addPost(string memory _PostCID) public {
        require(
            accounts[msg.sender].userAddress == msg.sender,
            "User doesn't exist"
        );
        allPostData.push(post({userAddress: msg.sender, postCID: _PostCID}));
    }

    function getPosts() public view returns (post[] memory) {
        require(
            accounts[msg.sender].userAddress == msg.sender,
            "User doesn't exist"
        );
        return allPostData;
    }

    // comment section
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

    // like section
    function addLikes(
        string memory _postCID,
        string memory _likesCID
    ) public {
        require(
            accounts[msg.sender].userAddress == msg.sender,
            "User doesn't exist"
        );
        allLikes[_postCID] = _likesCID;
    }

    function getLikes(
        string memory _postCID
    ) public view returns (string memory) {
        require(
            accounts[msg.sender].userAddress == msg.sender,
            "User doesn't exist"
        );
        require(
            abi.encodePacked(allLikes[_postCID]).length > 0,
            "No Likes"
        );
        return allLikes[_postCID];
    }

    // report section
    function addReports(
        string memory _postCID,
        string memory _reportCID
    ) public {
        require(
            accounts[msg.sender].userAddress == msg.sender,
            "User doesn't exist"
        );
        allReports[_postCID] = _reportCID;
    }

    function getReports(
        string memory _postCID
    ) public view returns (string memory) {
        require(
            accounts[msg.sender].userAddress == msg.sender,
            "User doesn't exist"
        );
        return allReports[_postCID];
    }

    
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //  Follow user functions                                                                                           //
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    function followUser(address _currentUser, address _userToFollow) public {
        require(_currentUser != _userToFollow, "Cannot follow yourself");

        // Ensure both users exist
        require(
            accounts[_currentUser].userAddress != address(0),
            "Current user does not exist"
        );
        require(
            accounts[_userToFollow].userAddress != address(0),
            "User to follow does not exist"
        );

        // Check if the current user is already following the user to follow
        require(
            !isFollowing(_currentUser, _userToFollow),
            "Already following this user"
        );

        // Add the user to follow to the following list of the current user
        accounts[_currentUser].following.push(_userToFollow);
        accounts[_currentUser].followingCount++;

        // Add the current user to the followers list of the user to follow
        accounts[_userToFollow].followers.push(_currentUser);
        accounts[_userToFollow].followersCount++;
    }

    // Function to check if a user is already following another user
    function isFollowing(
        address _currentUser,
        address _userToFollow
    ) internal view returns (bool) {
        address[] storage following = accounts[_currentUser].following;
        for (uint i = 0; i < following.length; i++) {
            if (following[i] == _userToFollow) {
                return true;
            }
        }
        return false;
    }

    function getFollowedUsers() public view returns (address[] memory) {
        return accounts[msg.sender].following;
    }

    function getFollowersCount(address userAddress) public view returns (uint) {
        return accounts[userAddress].followersCount;
    }
}

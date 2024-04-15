const SocialNetwork = artifacts.require("SocialNetwork");
const Web3 = require("web3");

contract("SocialNetwork", (accounts) => {
  const testUser = {
    userAddress: accounts[0],
    imageCID: "testCID",
    userName: Web3.utils.padRight(Web3.utils.asciiToHex("testName"), 64),
    firstName: Web3.utils.padRight(Web3.utils.asciiToHex("testfirstName"), 64),
    lastName: Web3.utils.padRight(Web3.utils.asciiToHex("testlastName"), 64),
    dateOfBirth: Web3.utils.padRight(
      Web3.utils.asciiToHex("testdateOfBirth"),
      64
    ),
    status: Web3.utils.padRight(Web3.utils.asciiToHex("teststatus"), 64),
    createdAt: "testcreatedAt",
  };
  let socialNetwork = null;
  before(async () => {
    socialNetwork = await SocialNetwork.deployed();
  });

  const updatedUserData = {
    userAddress: accounts[0],
    imageCID: "updatedCID",
    userName: Web3.utils.padRight(Web3.utils.asciiToHex("updatedName"), 64),
    firstName: Web3.utils.padRight(
      Web3.utils.asciiToHex("updatedFirstName"),
      64
    ),
    lastName: Web3.utils.padRight(Web3.utils.asciiToHex("updatedLastName"), 64),
    dateOfBirth: Web3.utils.padRight(
      Web3.utils.asciiToHex("updatedDateOfBirth"),
      64
    ),
    status: Web3.utils.padRight(Web3.utils.asciiToHex("updatedStatus"), 64),
  };

  it("deploys successfully", async () => {
    assert.notEqual(socialNetwork.address, "");
    assert.notEqual(socialNetwork.address, 0x0);
    assert.notEqual(socialNetwork.address, null);
    assert.notEqual(socialNetwork.address, undefined);
  });

  it("should create account successfully", async () => {
    await socialNetwork.registerUser(...Object.values(testUser));
    const returneddata = await socialNetwork.getUser(accounts[0]);
    const returnedTestUser = {
      userAddress: returneddata.userAddress,
      imageCID: returneddata.imageCID,
      userName: returneddata.userName,
      firstName: returneddata.firstName,
      lastName: returneddata.lastName,
      dateOfBirth: returneddata.dateOfBirth,
      status: returneddata.status,
      createdAt: returneddata.createdAt,
    };
    assert.deepEqual(testUser, returnedTestUser);
  });

  it("should update user information successfully", async () => {
    await socialNetwork.updateUser(...Object.values(updatedUserData), {
      from: accounts[0],
    });
    const returnedData = await socialNetwork.getUser(accounts[0]);
    assert.equal(returnedData.imageCID, updatedUserData.imageCID);
    assert.equal(returnedData.userName, updatedUserData.userName);
    assert.equal(returnedData.firstName, updatedUserData.firstName);
    assert.equal(returnedData.lastName, updatedUserData.lastName);
    assert.equal(returnedData.dateOfBirth, updatedUserData.dateOfBirth);
    assert.equal(returnedData.status, updatedUserData.status);
  });
  it("should add post successfully", async () => {
    const testPostCID = "testPostCID";
    await socialNetwork.addPost(testPostCID, { from: accounts[0] });
    const posts = await socialNetwork.getPosts({ from: accounts[0] });
    assert.equal(posts[0].postCID, testPostCID);
  });

  it("should add comment successfully", async () => {
    const testPostCID = "testPostCID";
    const testCommentCID = "testCommentCID";
    await socialNetwork.addComment(testPostCID, testCommentCID, {
      from: accounts[0],
    });
    const comment = await socialNetwork.getComment(testPostCID, {
      from: accounts[0],
    });
    assert.equal(comment, testCommentCID);
  });

  it("should add like successfully", async () => {
    const testPostCID = "testPostCID";
    const testLikeCID = "testLikeCID";
    await socialNetwork.addLikes(testPostCID, testLikeCID, {
      from: accounts[0],
    });
    const like = await socialNetwork.getLikes(testPostCID, {
      from: accounts[0],
    });
    assert.equal(like, testLikeCID);
  });

  it("should add report successfully", async () => {
    const testPostCID = "testPostCID";
    const testReportCID = "testReportCID";
    await socialNetwork.addReports(testPostCID, testReportCID, {
      from: accounts[0],
    });
    const report = await socialNetwork.getReports(testPostCID, {
      from: accounts[0],
    });
    assert.equal(report, testReportCID);
  });

  it("should follow user successfully", async () => {
    await socialNetwork.registerUser(
      ...Object.values({ ...testUser, userAddress: accounts[1] }),
      {
        from: accounts[1],
      }
    );

    const currentUser = accounts[0];
    const userToFollow = accounts[1];
    await socialNetwork.followUser(currentUser, userToFollow, {
      from: currentUser,
    });
    const followedUsers = await socialNetwork.getFollowedUsers({
      from: currentUser,
    });
    assert.equal(followedUsers[0], userToFollow);
  });

  it("should send message successfully", async () => {
    const sender = accounts[0];
    const receiver = accounts[1];
    const testChatCID = "testChatCID";
    await socialNetwork.sendMessage(sender, receiver, testChatCID, {
      from: sender,
    });
    const message = await socialNetwork.getMessage(sender, receiver, {
      from: sender,
    });
    assert.equal(message, testChatCID);
  });
});

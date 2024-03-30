import { fetchJSONFromIPFS } from './PinataUtils'
const PINATA_GATEWAY = import.meta.env.VITE_PINATA_PRIVATE_GATEWAY_URL

/**
 * get user data from a user address
 * @param {*} userAddress
 * @param {*} contract
 * @param {*} accounts
 * @returns {*}
 */
async function fetchUserData(userAddress, contract, accounts) {
  const data = await contract.methods
    .getUser(userAddress)
    .call({ from: accounts[0] })
    .catch((err) => {
      console.log(err)
    })
  return data
}

/**
 * fetch all existing posts
 * @param {*} contract
 * @param {*} accounts
 * @returns {*}
 */
async function fetchAllPosts(contract, accounts) {
  const allPostData = await contract.methods
    .getPosts()
    .call({ from: accounts[0] })

  return allPostData
}

export { fetchUserData, fetchAllPosts }

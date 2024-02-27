import React, { useState, useContext } from 'react'
import EthContext from '../contexts/EthContext'
import Web3 from 'web3'

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
 *
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

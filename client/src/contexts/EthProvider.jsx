import EthContext from './EthContext'
import Web3 from 'web3'
import artifact from '../contracts/SocialNetwork.json'
import { useEffect, useReducer } from 'react'

const actions = {
  init: 'INIT',
}

const initialState = {
  artifact: null,
  web3: null,
  accounts: null,
  networkID: null,
  contract: null,
  currentUserFollowing: [],
}

const reducer = (state, action) => {
  const { type, data } = action
  switch (type) {
    case actions.init:
      return { ...state, ...data };
    case 'UPDATE_CURRENT_USER_FOLLOWING':
      return { ...state, currentUserFollowing: data }
    default:
      throw new Error('Undefined reducer action type')
  }
}

function EthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    async function init() {
      const web3 = new Web3(window.ethereum)
      const accounts = await web3.eth.requestAccounts()
      const { abi } = artifact
      const networkID = await web3.eth.net.getId()
      const address = artifact.networks[networkID].address
      const contract = new web3.eth.Contract(abi, address)

      const currentUserFollowing = await contract.methods
        .getFollowedUsers()
        .call({ from: accounts[0] })

      dispatch({
        type: 'UPDATE_CURRENT_USER_FOLLOWING',
        data: currentUserFollowing,
      })
      dispatch({
        type: actions.init,
        data: { artifact, web3, accounts, networkID, contract },
      })
      console.log('Initial currentUserFollowing:', state.currentUserFollowing)
    }
    init()
  }, [])

  return (
    <EthContext.Provider value={{ state, dispatch }}>
      {children}
    </EthContext.Provider>
  )
}

export default EthProvider

const PINATA_JWT = import.meta.env.VITE_PINATA_API_KEY
const PINATA_GATEWAY = import.meta.env.VITE_PINATA_PRIVATE_GATEWAY_URL

/**
 * Pin file to IPFS using Pinata API
 * @param {File} file Image file to upload to IPFS
 * @returns {String} CID of the file uploaded to IPFS
 */
async function pinFileToIPFS(file) {
  try {
    const formData = new FormData()
    formData.append('file', file)

    const res = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${PINATA_JWT}`,
      },
      body: formData,
    })
    const resData = await res.json()
    console.log(resData)
    return resData.IpfsHash
  } catch (error) {
    console.log(error)
  }
}

/**
 * Pin JSON object to IPFS using Pinata API
 * @param {JSON} json JSON object to upload to IPFS
 * @returns {String | null} CID of the JSON object uploaded to IPFS or null if upload fails
 */
async function pinJSONToIPFS(json) {
  try {
    const res = await fetch('https://api.pinata.cloud/pinning/pinJSONToIPFS', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${PINATA_JWT}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(json),
    })
    const resData = await res.json()
    console.log(resData)
    return resData.IpfsHash
  } catch (error) {
    console.log(error)
  }
}

/**
 *
 * @param {String} CID cid hash of the file
 * @returns {JSON} data as json
 */
async function fetchJSONFromIPFS(CID) {
  try {
    const content = await fetch(`${PINATA_GATEWAY}/ipfs/${CID}`, {
      method: 'GET',
      headers: { accept: 'text/plain' },
    })
    return await content.json()
  } catch (error) {
    return null
  }
}

export { pinFileToIPFS, pinJSONToIPFS, fetchJSONFromIPFS }

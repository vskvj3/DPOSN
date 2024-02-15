import dotenv from 'dotenv'
import { NFTStorage } from 'nft.storage'

dotenv.config()

const NFT_STORAGE_KEY = process.env.NFT_STORAGE_KEY

/**
 * Upload file to IPFS
 * @param {File} file file to upload in File blob format
 * @returns {String} CID of the file uploaded to IPFS
 */
async function uploadFileToIPFS(file) {
  try {
    const nftstorage = new NFTStorage({ token: NFT_STORAGE_KEY })
    const cid = await nftstorage.storeBlob(file)
    console.log(cid)
    return cid
  } catch (err) {
    console.error(err)
  }
}

/**
 * upload text to IPFS
 * @param {String} text text to upload to IPFS in string format
 * @returns {String} CID of the text uploaded to IPFS
 */
async function uploadTextToIPFS(text) {
  try {
    const textBlob = new File([text], 'response.json', { type: 'text/plain' })
    const nftstorage = new NFTStorage({ token: NFT_STORAGE_KEY })
    const cid = await nftstorage.storeBlob(textBlob)
    console.log(cid)
    return cid
  } catch (err) {
    console.error(err)
  }
}

export { uploadFileToIPFS, uploadTextToIPFS }

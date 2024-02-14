import dotenv from 'dotenv'
import { NFTStorage } from 'nft.storage'

dotenv.config()

const NFT_STORAGE_KEY = process.env.NFT_STORAGE_KEY

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

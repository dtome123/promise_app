const storage = require('web3.storage')

async function getFiles (path) {
  const files = await storage.getFilesFromPath(path)
  console.log(`read ${files.length} file(s) from ${path}`)
  return files
}
async function storeFiles (files) {
  const client = makeStorageClient()
  const cid = await client.put(files)
  console.log('stored files with cid:', cid)
  return cid
}

async function storeFiles (files) {
  const client = makeStorageClient()
  const cid = await client.put(files)
  console.log('stored files with cid:', cid)
  return cid
}

function getAccessToken () {
  return process.env.WEB3STORAGE_TOKEN
}

function makeStorageClient () {
  return new storage.Web3Storage({ token: getAccessToken() })
}
async function storeWithProgress (files) {
  // show the root cid as soon as it's ready
  const onRootCidReady = cid => {
    console.log('uploading files with cid:', cid)
  }

  // when each chunk is stored, update the percentage complete and display
  const totalSize = files.map(f => f.size).reduce((a, b) => a + b, 0)
  let uploaded = 0

  const onStoredChunk = size => {
    uploaded += size
    const pct = totalSize / uploaded
    console.log(`Uploading... ${pct.toFixed(2)}% complete`)
  }

  // makeStorageClient returns an authorized Web3.Storage client instance
  const client = makeStorageClient()

  // client.put will invoke our callbacks during the upload
  // and return the root cid when the upload completes
  return client.put(files, { onRootCidReady, onStoredChunk })
}
module.exports = { getFiles, storeFiles,storeWithProgress }

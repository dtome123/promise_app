/* eslint-disable */
import { web3 } from '@project-serum/anchor'
import { Promise } from '../models'

// 1. Define the sendTweet endpoint.
export const createPromise = async ({ wallet, program }, hash) => {
    
    const promise = web3.Keypair.generate()
    console.log(wallet)
    console.log(hash)
    //3. Send a "SendTweet" instruction with the right data and the right accounts.
    console.log(promise.publicKey.toBase58())
    await program.value.rpc.create(hash, {
        accounts: {
            promise: promise.publicKey,
            author: wallet.value.publicKey,
            systemProgram: web3.SystemProgram.programId,
        },
        signers: [promise]
    })

    // // 4. Fetch the newly created account from the blockchain.
    // const promiseAccount = await program.value.account.promise.fetch(promise.publicKey)
    
    // // 5. Wrap the fetched account in a Tweet model so our frontend can display it.
    // return new Promise(promise.publicKey, promiseAccount)
    
}
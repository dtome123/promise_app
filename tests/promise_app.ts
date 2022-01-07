import * as anchor from '@project-serum/anchor';
import { Program } from '@project-serum/anchor';
import { PromiseApp } from '../target/types/promise_app';
import * as assert from "assert";

describe('promise_app', () => {

  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.Provider.env());

  const program = anchor.workspace.PromiseApp as Program<PromiseApp>;
  it('can create promise',async()=>{
    const promise = anchor.web3.Keypair.generate();
    //console.log(program.provider.wallet.publicKey)
    await program.rpc.create('bafybeigvdm6qeghek3s22uktwxenm22micxjymel4vr32w3wb3eh4ioqxe',{
      accounts:{
        promise:promise.publicKey,
        author: program.provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId
      },
      signers:[promise]
    })
    const promiseAccount = await program.account.promise.fetch(promise.publicKey);
    // console.log(promiseAccount.author.toBase58())
    assert.equal(promiseAccount.author.toBase58(),program.provider.wallet.publicKey.toBase58());
    assert.equal(promiseAccount.ipfsHash, "bafybeigvdm6qeghek3s22uktwxenm22micxjymel4vr32w3wb3eh4ioqxe")
    
  });
});

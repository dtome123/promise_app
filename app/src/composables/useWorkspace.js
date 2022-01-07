import { inject, provide, computed } from 'vue'
import { useAnchorWallet } from '@solana/wallet-adapter-vue'
import { Connection, PublicKey } from '@solana/web3.js'
import { Provider, Program } from '@project-serum/anchor'
import idl from '../idl/promise_app.json'

const preflightCommitment = 'processed'
const commitment = 'processed'
const programID = new PublicKey(idl.metadata.address)
const workspaceSymbol = Symbol()


export const useWorkspace = () => inject(workspaceSymbol)

export const initWorkspace = () => {
    const url = "https://api.devnet.solana.com"
    // const url = "http://127.0.0.1:8899"
    const wallet = useAnchorWallet()
    const connection = new Connection(url, commitment)
    const provider = computed(() => new Provider(connection, wallet.value, { preflightCommitment, commitment }))
    const program = computed(() => new Program(idl, programID, provider.value))
    
    provide(workspaceSymbol, {
        wallet,
        connection,
        provider,
        program
    })
}
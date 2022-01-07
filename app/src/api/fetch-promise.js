import { Promise } from '@/models'

export const fetchPromises = async ({ program },filters = []) => {
    const promises = await program.value.account.promise.all(filters);
    // console.log(promises)
    return promises.map(promise => new Promise(promise.publicKey, promise.account))
}

export const authorFilter = authorBase58PublicKey => ({
    memcmp: {
        offset: 8, // Discriminator.
        bytes: authorBase58PublicKey,
    }
})
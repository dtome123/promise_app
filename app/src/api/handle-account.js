export const getAddress = async(publicKey)=>{
    return await publicKey.value.toBase58();
}
export const getBalance = async({wallet,connection})=>{
    return await connection.getBalance(wallet.value.publicKey);
}
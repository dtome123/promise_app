
import { sha256 } from '@project-serum/anchor/dist/cjs/utils'
import { bs58 } from '@project-serum/anchor/dist/cjs/utils/bytes';
import {sign} from 'tweetnacl'


export const signText = async(text,signMessage)=>{
    var hash_text = sha256.hash(text);
    const message = new TextEncoder().encode(hash_text);
    const signature = await signMessage.value(message);
    return signature;   
}

export const verifySignature = async(text,signature,publicKey)=>{
    var hash_text = sha256.hash(text);
    const message = new TextEncoder().encode(hash_text);
    if(!sign.detached.verify(message, signature, publicKey.toBytes())){
        alert("Invalid signature or text!")
        return false;
    }
    return true;
}
export const signatureToString = (signature)=>{
    return bs58.encode(signature)
}
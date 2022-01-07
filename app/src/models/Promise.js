import dayjs from "dayjs"
export class Promise{
    constructor(publickKey,accountData){
        this.publicKey = publickKey;
        this.author = accountData.author;
        this.ipfsHash = accountData.ipfsHash;
        this.timestamp = accountData.timestamp.toString()
    }
    get key () {
        return this.publicKey.toBase58()
    }
    get author_display () {
        const author = this.author.toBase58()
        return author.slice(0,4) + '..' + author.slice(-4)
    }
    get created_at () {
        return dayjs.unix(this.timestamp).format('lll')
    }

    get created_ago () {
        return dayjs.unix(this.timestamp).fromNow()
    }
}
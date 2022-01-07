export const storageIPFS = async(message,image,signature)=>{
    var formData = new FormData();
    formData.append('mess',message)
    formData.append('img',image)
    formData.append('sign',signature)
    console.log("Storge",signature)
    
    const response = await fetch("http://localhost:3001/api/upfile", {
        method:"POST",
        body:formData
    });
    const data = await response.json();
    var ipfs_hash = data.cid;
    return  ipfs_hash;
}
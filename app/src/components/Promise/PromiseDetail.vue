<script setup>
import { ref, toRefs } from 'vue'

const props = defineProps({
    promise: Object,
})

/* eslint-disable */
const { promise } = toRefs(props)
const text = ref('')
const loading = ref(false)
// const path_text="https://"+promise.value.ipfsHash+".ipfs.dweb.link/message.txt";
// const path_img='https://'+promise.value.ipfsHash+'.ipfs.dweb.link/image.jpg'
const path_text = "https://ipfs.io/ipfs/"+promise.value.ipfsHash+"/message.txt";
const path_img = "https://ipfs.io/ipfs/"+promise.value.ipfsHash+"/image.jpg"
const get = (async ()=>{
    // console.log(promise.value.ipfsHash)
    const response = await fetch(path_text, {
            method:"GET"
    });
    
    const data = await response.text()
    if(response.ok){
        text.value = data
    }
    else{
        text.value = "[Not found text]"
    }
    loading.value = true;
})
get()



</script>
<template>
    <div class="border border-secondary border-4 rounded">
        <div v-if="loading">
            <div class="px-8 py-4">
                <h3 class="inline font-semibold" :title="promise.author">
                    <!-- TODO: Link to author page or the profile page if it's our own tweet. -->
                    Promise key: {{promise.key}}
                </h3>
                <div>
                    <!-- <span>Hash: {{promise.ipfsHash}}</span> -->
                    <div>
                        <div>Text: {{text}}</div>
                    </div>
                    <div>
                        <h4>Image</h4>
                        <div>
                            <img class="img-thumbnail mx-auto d-block" v-bind:src="path_img" alt="" style="max-height:300px ;">
                        </div>
                    </div>
                </div>
                <div>
                    <span>Created at: {{promise.created_at}}</span>
                </div>
            </div>
        </div>
        <div v-else>
            Container is loading
        </div>

    </div>
</template>
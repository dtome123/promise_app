<script setup>
/* eslint-disable */
import { computed, ref, toRefs } from 'vue'
import { useAutoresizeTextarea, useCountCharacterLimit, useSlug,  } from '@/composables'
import {useWorkspace} from '@/composables'
import {useWallet, useAnchorWallet} from "@solana/wallet-adapter-vue"
import { createPromise , signText,storageIPFS, signatureToString} from '@/api'
import { bs58 } from '@project-serum/anchor/dist/cjs/utils/bytes'





const message = ref('')
const image = ref()
const isStoring = ref(false)
// const characterLimit = useCountCharacterLimit(message, 64)


const {connected,signMessage,publicKey} = useWallet()
var canSend = computed(() => image.value && message.value &&isStoring.value==false)

const workspace = useWorkspace()

const send=async ()=>{
    // canSend = false;
    
    if(!canSend.value) return

    
    isStoring.value=true;

    try {
        const signature = await signText(message.value,signMessage)
        const ipfs_hash = await storageIPFS(message.value,image.value,signatureToString(signature))
        const promise = await createPromise(workspace,ipfs_hash)    
        alert("Success")
    } catch (error) {
        alert(error)
        console.log(error)
    }
    finally{
        message.value=''
        // console.log(message.value)
        // console.log(image.value)
        canSend.value = true;
        isStoring.value=false;
    }
    
    
    
}
</script>

<template>
    <div>
        <div v-if="connected">
            <!-- <textarea
                ref="textarea"
                rows="1"
                class="text-xl w-full focus:outline-none resize-none mb-3"
                placeholder="Send IPFS message"
                v-model="content"
            ></textarea> -->
            <label for="" class="text-xl w-full focus:outline-none resize-none mb-3">Text</label>
            <div class="flex flex-wrap items-center justify-between -m-2">
                <!-- Text field. -->
                <div class="relative m-2 mr-4">
                    <textarea
                        type="text"
                        placeholder="Text"
                        class="text-black-500 pl-10 pr-4 py-2 bg-gray-100"
                        style="width: 30em;"
                        rows="7"
                        @input="message = $event.target.value"
                    ></textarea>
                    <div class="absolute left-0 inset-y-0 flex pl-3 pr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 m-auto" :class="effectiveTopic ? 'text-pink-500' : 'text-gray-400'" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M9.243 3.03a1 1 0 01.727 1.213L9.53 6h2.94l.56-2.243a1 1 0 111.94.486L14.53 6H17a1 1 0 110 2h-2.97l-1 4H15a1 1 0 110 2h-2.47l-.56 2.242a1 1 0 11-1.94-.485L10.47 14H7.53l-.56 2.242a1 1 0 11-1.94-.485L5.47 14H3a1 1 0 110-2h2.97l1-4H5a1 1 0 110-2h2.47l.56-2.243a1 1 0 011.213-.727zM9.03 8l-1 4h2.938l1-4H9.031z" clip-rule="evenodd" />
                        </svg>
                    </div>
                    <div>
                        <label for="" class="text-xl w-full focus:outline-none resize-none mb-3">Choose image</label><br>   
                        <input type="file" accept="image/*" @input="image = $event.target.files[0]">
                    </div>
                </div>
                <div class="flex items-center space-x-6 m-2 ml-auto">
                    <!-- Tweet button. -->
                    <button
                        class="text-white px-4 py-2 rounded-full font-semibold " 
                        :class="canSend ? 'bg-blue-500' : 'bg-blue-300 cursor-not-allowed'"
                        @click="send"
                    >
                        Send
                    </button>
                </div>
            </div>
            
            <div :class="isStoring?'':'hidden'">
                <div class="spinner-grow text-primary"
                        role="status" 
                        style="margin: 10px;">
                    <span class="sr-only">Loading...</span>
                </div>
                <span style="margin-left:100px">Storing ...</span>
            </div>
            
            
        </div>
        <div v-else>
            Connecting wallet
        </div>
        
    </div>
</template>

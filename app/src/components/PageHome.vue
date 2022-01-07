<script setup>
/* eslint-disable */
import { ref } from 'vue'
import { fetchPromises } from '@/api'
import {useWorkspace} from '../composables'
import {useWallet} from '@solana/wallet-adapter-vue'

import PromiseList from './Promise/PromiseList.vue'

const {connected,publicKey} = useWallet()

const promises = ref([])
const loading = ref(true)
fetchPromises(useWorkspace())
    .then(fetchPromises =>{
        promises.value = fetchPromises
        // console.log(promises)
    } )
    .finally(() => loading.value = false)
</script>

<template>
    <div>
        <div v-if="connected" class="px-8 py-4 border-b">
            <div>
                <label for="">Address: </label>
                <span>{{publicKey}}</span>
            </div>
            
        </div>
        <div v-else class="px-8 py-4 bg-gray-50 text-gray-500 text-center border-b">
            Connect your wallet to start...
        </div>
        <div>
            
            <promise-list :promises="promises" :loading="loading"></promise-list>    
            
            
            <!-- {{promises}} -->
        </div>
    </div>
    <!-- <tweet-form @added="addTweet"></tweet-form>
    <tweet-list :tweets="promises" :loading="loading"></tweet-list> -->
</template>

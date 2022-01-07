<script setup>
/* eslint-disable */
import { ref, watchEffect,computed } from 'vue'
import { useWorkspace } from '@/composables'
import { useWallet } from '@solana/wallet-adapter-vue'
import { fetchPromises, authorFilter, getBalance, getAddress} from '@/api'
import PromiseDetail from '../components/Promise/PromiseDetail.vue'

const {publicKey,connected} = useWallet()
// const {wallet,connection,pubKey} = useWorkspace()

const balance = ref()
const promises = ref([])
const loading = ref(true)

watchEffect(async()=>{
    const workspace = await useWorkspace();
    const {wallet,connection} = workspace
    console.log(connected.value)
    // while(connected.value == false){
    //     console.log(connected.value)
    // }
    // await new Promise(r => setTimeout(r, 30000));
    if(connected.value)
    {
        const hadAddress = computed(()=>publicKey.value ? true : false)
        connection.getBalance(wallet.value.publicKey).then((bal)=>{
            balance.value = bal
        });
    }
    console.log(connected.value)
})
// fetchPromises(useWorkspace(),[authorFilter("47iF6r4dZM3kaTBnpHZHuCA8CpocVLyu7EJjLEDEjou4")])
fetchPromises(useWorkspace(),[authorFilter(publicKey.value.toBase58())])
.then(fetchPromises =>{
    promises.value = fetchPromises;
} )
.finally(() => loading.value = false)

</script>

<template>
    <!-- TODO: Check connected wallet -->

    <div>
        <div v-if="connected">
            <div class="border-b px-8 py-4 bg-gray-50">
                <div>Account: {{ publicKey.toBase58() }}</div>
                <div>Balance: {{balance}}</div>
            </div>
            
            <div v-if="!loading">
                <promise-detail v-for="promise in promises" :key="promise.key" :promise="promise"></promise-detail>
            </div>
            <div v-else>
                Loading ...
            </div>
        </div>
        <div v-else>
            Can't connect your wallet
        </div>
    </div>
    
</template>

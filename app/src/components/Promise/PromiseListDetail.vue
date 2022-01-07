<script setup>
import {computed ,toRefs } from 'vue'
// eslint-disable-next-line


</script>
<template>
    <div class="px-8 py-4">
        <div v-if="loading" class="p-8 text-gray-500 text-center">
            Loading...
        </div>
        <div v-else class="divide-y">
            <!-- {{promises}} -->
            
            <promise-card class="border border-dark " style="margin-top:20px" v-for="promise in orderedPromises" :key="promise.key" :promise="promise"></promise-card>
        </div>
    </div>
</template>
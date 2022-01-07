<script setup>
import { toRefs } from 'vue'

const props = defineProps({
    promise: Object,
})
const { promise } = toRefs(props)

</script>
<template>
    <div class="px-8 py-4">
        <h3 class="inline font-semibold" :title="promise.author">
            <!-- TODO: Link to author page or the profile page if it's our own tweet. -->
            Author: {{promise.author_display}}
        </h3>
        <hr>
        <div>
            <span class="fw-bold">Promise Key: </span>
            {{promise.key}}
        </div>
        <hr>
        <div>
            <span class="fw-bold">Hash: </span>
            {{promise.ipfsHash}}
        </div>
        <hr>
        <div>
            <span class="fw-bold">Created ago: {{promise.created_ago}}</span>
        </div>
    </div>
</template>
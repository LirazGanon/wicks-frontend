<template>
    <!-- <h2>{{ info }}</h2> -->
    <section class="main-layout full" v-if="cmp" :style="cmp.style">
        
        <section class="wap-container" :class="cmp.classes">
            <div v-for="childCmp in cmp.cmps">
                <component :is="(childCmp.type)" :cmp="childCmp" :cmpId="cmp.id" @openEditor="puk" />
            </div>
            <section class="wap-img" v-if="cmp.info.imgs">
                <img v-for="img in cmp.info.imgs" :src="img.src" alt="" :style="img.style" >
            </section>

        </section>
        <pre>{{ cmp }}</pre>
    </section>

</template>
<script>


import wapGallery from './wap-gallery-edit.vue'

import wapImg from './wap-img-edit.vue'
import wapCard from './wap-card-edit.vue'

export default {
    name: 'dynamic-container-cmp',
    props: { cmp: Object },
    components: { wapGallery, wapImg, wapCard },
    data() {
        return {};
    },
    created() { },
    methods: {
        puk(payload) {
            console.log('payload:', payload)
            // payload.id = cmp.id
            this.$emit('openEditor', payload)
        },
    },
    computed: {},
    unmounted() { },
};
</script>
<style>

</style>
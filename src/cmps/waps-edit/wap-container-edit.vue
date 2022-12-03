<template>
    <!-- <h2>{{ info }}</h2> -->
    <section class="main-layout full" v-if="cmp" :style="cmp.style">

        <section class="wap-container" :class="cmp.classes">

            <component v-for="(curCmp, idx) in cmp.cmps" :is="curCmp.type" :cmp="curCmp" :path="getPath(idx)"
                @openEditor="$emit('openEditor', $event)" />

            <section class="wap-img" v-if="cmp.info.imgs">
                <img v-for="img in cmp.info.imgs" :src="img.src" alt="" :style="img.style">
            </section>

        </section>
        <!-- <pre>{{ cmp }}</pre> -->
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
        }, getPath(idx) {
            const wap = this.$store.getters.getWapToEdit
            const cmpIdx = wap.cmps.findIndex(cmp => cmp.id === this.cmp.id)
            return { fatherIdx: cmpIdx, idx }
        }
    },
    computed: {},
    unmounted() { },
};
</script>
<style>

</style>
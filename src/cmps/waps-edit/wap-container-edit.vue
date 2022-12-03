<template>
    <!-- <h2>{{ info }}</h2> -->
    <section class="main-layout full" v-if="cmp" :style="cmp.style">

        <section class="wap-container" :class="cmp.classes">

            <component v-for="(curCmp, idx) in cmp.cmps" :is="curCmp.type" :cmp="curCmp" :path="getPath(idx)"
                @openEditor="$emit('openEditor', $event)" />
            <!-- TODO:IMG EDITOR -->
            <section class="wap-img" v-if="cmp.info.imgs">
                <img v-for="(img, idx) in cmp.info.imgs" :src="img.src" alt="" :style="img.style"
                    @click="openEditor('imgs', idx)">
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
        openEditor(key, idx) {
            const el = (idx !== undefined) ? this.cmp.info[key][idx] : this.cmp.info[key]

            const wapContent = {
                key,
                path: this.getPath(),
                el,
                currCmp: this.cmp,
                elIdx: idx
            }
            this.$emit('openEditor', wapContent)
        },
        getPath(idx) {
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
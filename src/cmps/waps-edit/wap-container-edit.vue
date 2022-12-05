<template>
    <!-- <h2>{{ info }}</h2> -->
    <section class="main-layout full" v-if="cmp" @click="openSectionEditor" :style="cmp.style">

        <section class="wap-container"  :style="cmp.style" :class="cmp.classes">

            <component v-for="(curCmp, idx) in cmp.cmps" :is="curCmp.type" :cmp="curCmp" :path="getPath(idx)"
                @openEditor="$emit('openEditor', $event)" />
            <!-- TODO:IMG EDITOR -->
            <section class="wap-img" v-if="cmp.info.imgs">
                <img v-for="(img, idx) in cmp.info.imgs" :src="img.src" alt="" :style="img.style"
                    @click.stop="openEditor('imgs', idx)">
            </section>

        </section>
        <!-- <pre>{{ cmp }}</pre> -->
    </section>

</template>
<script>


import wapGallery from './wap-gallery-edit.vue'

import wapImg from './wap-img-edit.vue'
import wapCard from './wap-card-edit.vue'

import { utilService } from '../../services/util.service';

export default {
    name: 'dynamic-container-cmp',
    props: { cmp: Object },
    components: { wapGallery, wapImg, wapCard },
    data() {
        return {};
    },
    created() {
        
     },
    methods: {
        openSectionEditor() {

            const cmpContent = {
                el: { type: 'section' },
                currCmp: this.cmp,
                path: this.getPath()
            }
            this.$emit('openEditor', cmpContent)
        },
        openEditor(key, idx) {
            let el = (idx !== undefined) ? this.cmp.info[key][idx] : this.cmp.info[key]
            el = utilService.copy(el)
            const cmpContent = {
                key,
                path: this.getPath(),
                el,
                currCmp: this.cmp,
                elIdx: idx
            }
            this.$emit('openEditor', cmpContent)
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
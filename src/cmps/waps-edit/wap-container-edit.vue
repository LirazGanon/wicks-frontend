<template>
    <!-- <h2>{{ info }}</h2> -->
    <section class="main-layout full wap-container-wrapper" v-if="cmp" @click="openSectionEditor"
        @mousedown="$emit('acceptDrop')" :style="cmp.style" :class="[...cmp.classes, selected]">

        <section class="wap-container" :class="cmp.classes" :style="getCmpStyle">

            <h1 v-if="cmp.info.heading?.txt" :style="cmp.info.heading.style" @click.stop
                @mousedown.stop="openEditor('heading')">{{ cmp.info.heading.txt }}</h1>

            <div v-for="(curCmp, idx) in cmp.cmps">
                <component :is="curCmp?.type" :cmp="curCmp" :path="getPath(idx)"
                    @openEditor="$emit('openEditor', $event)" />
            </div>
            
            <section class="wap-img" v-if="cmp.info.imgs">
                <img v-for="(img, idx) in cmp.info.imgs" :src="img.src" alt="" :style="img.style" @dragstart.prevent
                @mousedown.stop="openEditor('imgs', idx)" @click.stop>
            </section>
            
        </section>
        <!-- <pre>{{cmp}}</pre> -->
        <!-- TODO:IMG EDITOR -->
        <!-- <div v-if="cmp.info.price">{{ cmp.info.price }}</div> -->
        <!-- <pre>{{ cmp }}</pre> -->
    </section>

</template>
<script>


import wapGallery from './wap-gallery-edit.vue'

import wapCard from './wap-card-edit.vue'

import { utilService } from '../../services/util.service';

export default {
    name: 'dynamic-container-cmp',
    props: { cmp: Object, isSelected: Boolean },
    components: { wapGallery, wapCard },
    data() {
        return {

        };
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
            return { fatherIdx: cmpIdx, idx, id: this.cmp.id }
        }
    },
    computed: {
        selected() {
            return this.isSelected ? 'selected1' : ''
        },
        getCmpStyle() {
            const style = utilService.copy(this.cmp.style)
            delete style['background-image']
            return style
        }
    },
    unmounted() { },
};
</script>
<style>

</style>
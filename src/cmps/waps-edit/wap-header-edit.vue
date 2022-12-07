<template>

    <header class="wap-header main-layout full" :class="[...cmp.classes, selected]" @click.stop="openSectionEditor"
        :style="cmp.style" @mousedown="$emit('acceptDrop')" >
        <section class="flex space-between">


            <div class="wap-logo flex align-center">
                <img :src="cmp.info.logo?.src" v-if="cmp.info.logo.src" @click.stop="openEditor('imgs', idx)"
                    :style="cmp.info.logo.style">



                <h4 v-else contenteditable="true" @click.stop @mousedown.stop="openEditor('logo')"
                    :style="cmp.info.logo.style" @blur="updateCmp($event, 'logo')">{{
                            cmp.info.logo.txt
                    }}</h4>


            </div>

            <component v-for="(curCmp, idx) in cmp.cmps" :is="curCmp.type" :cmp="curCmp" :path="getPath(idx)"
                @openEditor="$emit('openEditor', $event)" />


        </section>


    </header>
</template>
<script>

import wapNav from './wap-nav-edit.vue'
import { utilService } from '../../services/util.service';

export default {
    name: 'dynamic-header-cmp',
    props: { cmp: Object ,isSelected: Boolean },
    components: { wapNav },
    data() {
        return {
        };
    },
    created() {
    },
    methods: {

        openEditor(key, idx) {
            let el = (idx !== undefined) ? this.cmp.info[key][idx] : this.cmp.info[key]
            el = utilService.copy(el)
            const wapContent = {
                key,
                path: this.getPath(),
                el,
                currCmp: this.cmp,
                elIdx: idx
            }
            this.$emit('openEditor', wapContent)
        },
        openSectionEditor() {
            const currCmp = utilService.copy(this.cmp)
            const wapContent = {
                el: { type: 'section' },
                currCmp,
                path: this.getPath()
            }
            this.$emit('openEditor', wapContent)
        },
        updateCmp(ev, key) {
            const path = this.getPath()
            let cmp = this.getCurrCmp(path)
            cmp = utilService.copy(cmp)

       
            if(cmp.info[key].txt === ev.target.innerText) return

            cmp.info[key].txt = ev.target.innerText

            try {
                this.$store.dispatch({ type: 'updateWap', cmp, path })
            } catch {
                console.log('ops')
            }
        },
        getPath(idx) {
            const wap = this.$store.getters.getWapToEdit
            const cmpIdx = wap.cmps.findIndex(cmp => cmp.id === this.cmp.id)
            return { fatherIdx: cmpIdx, idx, id: this.cmp.id }
        },
        getCurrCmp(path) {
            const wap = this.$store.getters.getLastState
            if (path.idx !== undefined) {
                return wap.cmps[path.fatherIdx].cmps[path.idx]
            } else {
                return wap.cmps[path.fatherIdx]
            }
        }
    },
    computed: {
        selected() {
            return this.isSelected ? 'selected' : ''
        }
    },
    unmounted() { },
};
</script>
<style>

</style>
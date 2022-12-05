<template>

    <header class="wap-header main-layout full" :class="cmp.classes" @click="openSectionEditor" :style="cmp.style"
        v-bind:class="class">
        <section class="flex space-between">


            <div class="wap-logo flex align-center">
                <img :src="cmp.info.logo?.img" v-if="cmp.info.logo.img" @click.stop="openEditor('imgs', idx)"
                    :style="cmp.info.logo.style">



                <h4 v-else contenteditable="true" @click.stop="openEditor('logo')" :style="cmp.info.logo.style"
                    @input="updateCmp($event, 'logo')">{{ cmp.info.logo.txt }}</h4>
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
    props: { cmp: Object },
    components: { wapNav },
    data() {
        return {
            selected: false
        };
    },
    created() {
        this.updateCmp = utilService.debounce(this.updateCmp,500)
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
            this.selected = true
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
            let cmp = utilService.copy(this.cmp)
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
            return { fatherIdx: cmpIdx, idx }
        }
    },
    computed: {
        class() {
            return { selected: this.selected }
        }
    },
    unmounted() { },
};
</script>
<style>

</style>
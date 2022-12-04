<template>

    <header class="wap-header main-layout full" :class="cmp.classes" @click="openSectionEditor" :style="cmp.style">
        <section class="flex space-between">


            <div class="wap-logo flex align-center">
                <img :src="cmp.info.logo?.img" v-if="cmp.info.logo.img" @click.stop="openEditor('imgs', idx)"
                    :style="cmp.info.logo.style">



                <h4 v-else contenteditable="true" @click.stop="openEditor('logo')" :style="cmp.info.logo.style"
                    @input="updateCmp($event,'logo')">{{ cmp.info.logo.txt }}</h4>
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
        return {};
    },
    created() { },
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
        openSectionEditor(){
            const currCmp = utilService.copy(this.cmp)
            const wapContent = {
                el:{type:'section'},
                currCmp,
                path:this.getPath()
            }
            this.$emit('openEditor',wapContent)
        },
        updateCmp(ev, key) {
            let wap = this.$store.getters.getWapToEdit
            const idx = wap.cmps.findIndex(cmp => cmp.id === this.cmp.id)
            let cmpCopy = JSON.parse(JSON.stringify(this.cmp))
            cmpCopy.info[key].txt = ev.target.innerText
            wap = JSON.parse(JSON.stringify(wap))
            wap.cmps[idx] = cmpCopy
            try {
                this.$store.dispatch({ type: 'updateWap', wap })
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
    },
    unmounted() { },
};
</script>
<style>

</style>
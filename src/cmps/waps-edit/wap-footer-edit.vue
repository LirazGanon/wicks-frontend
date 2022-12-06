<template>
    <section class="main-layout full" @click="openSectionEditor" :style="cmp.style" >
        <section class="wap-footer" :style="cmp.style" :class="cmp.classes">


            <p v-if="(cmp.info.logo.type === 'txt')" class="logo" contenteditable="true" @mousedown.stop="openEditor('logo')" @click.stop
                :style="cmp.info.logo.style" @blur="updateCmp($event, 'logo')">
                {{ cmp.info.logo.txt }}</p>
            <img v-if="(cmp.info.logo.type === 'img')" class="logo" :src="cmp.info.logo.src">

            <p class="copyright" contenteditable="true" @mousedown.stop="openEditor('copyright')" @click.stop
                :style="cmp.info.copyright.style" @blur="updateCmp($event, 'copyright')">{{ cmp.info.copyright.txt }}
            </p>
        </section>
    </section>

</template>
<script>
import { utilService } from '../../services/util.service';

export default {
    name: 'dynamic-footer-cmp',
    props: { cmp: Object },
    components: {},
    data() {
        return {};
    },
    created() { 
    },
    methods: {
        openSectionEditor() {

            const wapContent = {
                el: { type: 'section' },
                currCmp: this.cmp,
                path: this.getPath()
            }
            this.$emit('openEditor', wapContent)
        },
        openEditor(key, idx) {
            let el = (idx !== undefined) ? this.cmp.info[key][idx] : this.cmp.info[key]
            el = utilService.copy(el)
            const wapContent = {
                key,
                path: this.getPath(),
                el,
                currCmp: this.cmp
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
            return { fatherIdx: cmpIdx, idx, id: this.cmp.id }
        }
    },
    computed: {},
    unmounted() { },
};
</script>
<style>

</style>
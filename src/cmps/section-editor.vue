<template>
    <section class="section-cmp-editor flex column">
        <h2>Section Edit</h2>
        <span>Backround Color</span>
        <color-picker @setColor="updateBgClr" />

        <button @click="removeCmp">remove</button>
        <button @click="duplicateCmp">duplicate</button>

    </section>
</template>
<script>
import { utilService } from '../services/util.service';
import colorPicker from './util/color-picker.vue';

export default {
    name: 'variable',
    props: { info: Object },
    components: { colorPicker },
    data() {
        return {};
    },
    created() {
        console.log('this.info:', this.info)
    },
    methods: {
        updateBgClr(clr) {
            this.updateCmp('background-color', clr)
        },
        updateCmp(att, value) {
            const { path, currCmp } = this.info
            const originalWap = this.$store.getters.getWapToEdit
            console.log(currCmp);
            const copyCmp = utilService.copy(currCmp)
            const wap = utilService.copy(originalWap)

            copyCmp.style[att] = value
            console.log(copyCmp);
            wap.cmps[path.fatherIdx] = copyCmp
            try {
                this.$store.dispatch({ type: 'updateWap', wap })
            } catch {
                console.log('ops')
            }
        },

        removeCmp(){

        const { path, currCmp } = this.info
        console.log(currCmp)
        console.log(path)
        
        },

        duplicateCmp(){
            const { path, currCmp } = this.info
            console.log(currCmp)
            console.log(path)

            
        },
    },
    computed: {},
    unmounted() { },
};
</script>
<style>

</style>
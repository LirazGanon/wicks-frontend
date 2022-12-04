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

            const copyCmp = utilService.copy(currCmp)

            copyCmp.style[att] = value

            try {
                this.$store.dispatch({ type: 'updateWap', cmp: copyCmp, path })
            } catch {
                console.log('ops')
            }
        },

        removeCmp(){
        const { path, currCmp } = this.info
        const copyCmp = utilService.copy(currCmp)
        this.$store.dispatch({ type: 'removeCmp', cmp: copyCmp, path })

        try {
                this.$store.dispatch({ type: 'removeCmp', cmp: copyCmp, path })
            } catch {
                console.log('ops')
            }
        },

        duplicateCmp(){
            const { path, currCmp } = this.info
            const copyCmp = utilService.copy(currCmp)
            currCmp.id = utilService.makeId()
            try {
                this.$store.dispatch({ type: 'duplicateCmp', cmp: copyCmp, path })
            } catch {
                console.log('ops')
            }
            
        },
    },
    computed: {},
    unmounted() { },
};
</script>
<style>

</style>
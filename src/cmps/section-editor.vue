<template>


    <section class="section-cmp-editor flex column">
        <h2>Section Edit</h2>
        <section class="delete-duplicate">
            <button v-tooltip="'Delete Section'" class="material-symbols-outlined" @click="removeCmp">delete</button>
            <button v-tooltip="'Copy Section'" class="material-symbols-outlined"
                @click="duplicateCmp">content_copy</button>
        </section>

        <hr>

        <span>Backround Color</span>
        <color-picker @setColor="updateBgClr" />



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
        return {
            style: {}
        };
    },
    created() {
    },
    methods: {
        updateBgClr(clr) {
            this.style = { 'background-color': clr }
            this.updateCmp()
        },
        updateCmp() {
            const { path, currCmp } = this.info

            const copyCmp = utilService.copy(currCmp)

            copyCmp.style = this.style

            try {
                this.$store.dispatch({ type: 'updateWap', cmp: copyCmp, path })
            } catch {
                console.log('ops')
            }
        },

        removeCmp() {
            const { path, currCmp } = this.info
            const copyCmp = utilService.copy(currCmp)
            this.$store.dispatch({ type: 'removeCmp', cmp: copyCmp, path })

            try {
                this.$store.dispatch({ type: 'removeCmp', cmp: copyCmp, path })
            } catch {
                console.log('ops')
            }
        },

        duplicateCmp() {
            const { path, currCmp } = this.info

            const copyCmp = utilService.copy(currCmp)
            copyCmp.id = utilService.makeId()
            if (this.style['background-color']) {
                copyCmp.style = this.style
            }
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
<template>


    <section class="section-cmp-editor flex column">
        <h2>Section Edit</h2>
        <section class="delete-duplicate" v-if="cmpsLength">
            <button v-tooltip="'Delete Section'" class="material-symbols-outlined" @click="removeCmp">delete</button>
            <button v-tooltip="'Copy Section'" class="material-symbols-outlined"
                @click="duplicateCmp">content_copy</button>

            <span>Backround Color</span>
            <color-picker @setColor="updateBgClr" />

        </section>
        <section v-else>
            Please select a section
        </section>

        <hr>


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
            style: {},
            cmp: null,
            path: null
        };
    },
    created() {
        this.setInfo()
    },
    methods: {
        setInfo() {
            this.cmp = this.info.currCmp
            this.path = this.info.path
        },
        updateBgClr(clr) {
            this.style = { 'background-color': clr }
            this.updateCmp()
        },
        updateCmp() {
            const path = this.path
            const cmp = utilService.copy(this.cmp)


            cmp.style = this.style

            try {
                this.$store.dispatch({ type: 'updateWap', cmp, path })
            } catch {
                console.log('ops')
            }
        },

        async removeCmp() {
            const path = this.path
            const currCmp = utilService.copy(this.cmp)

            console.log('path:', path)
            try {
                await this.$store.dispatch({ type: 'removeCmp', cmp: currCmp, path })
                const wap = this.$store.getters.getWapToEdit
                if (path.fatherIdx <= wap.cmps.length - 1) {
                    this.cmp = wap.cmps[path.fatherIdx]
                }
                else {
                    this.cmp = wap.cmps[path.fatherIdx - 1]
                    this.path.fatherIdx = path.fatherIdx - 1
                }
            } catch {
                console.log('ops')
            }
        },

        duplicateCmp() {
            const path = this.path
            const cmp = utilService.copy(this.cmp)

            cmp.id = utilService.makeId()
            if (this.style['background-color']) {
                cmp.style = this.style
            }
            try {
                this.$store.dispatch({ type: 'duplicateCmp', cmp, path })
            } catch {
                console.log('ops')
            }

        },
    },
    computed: {
        cmpsLength() {
            const wap = this.$store.getters.getWapToEdit
            return wap.cmps.length
        }
    },
    unmounted() { },
    watch: {
        info: function () { this.setInfo() }
    }

};
</script>
<style>

</style>
<template>
    <section class="section-cmp-editor flex column">
        <h2>Section Edit</h2>
        <span>Backround Color</span>
        <color-picker @setColor="updateBgClr" />

        <button>remove</button>
        <button>duplicate</button>

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
        }
    },
    computed: {},
    unmounted() { },
};
</script>
<style>

</style>
<template>
    <section class="img-cmp-editor flex column">
        <h2>Edit</h2>
        <img :src="info.el.src" :style="info.el.style">
        <label>
            <span>src </span>
            <input type="text" :value="info.el.src" @input="updateSrc">
        </label>
        <label>
            <span>Border-radius </span>
            <input type="range" min="0" max="50" :value="rangeValue" @input="updateRadius">
        </label>
    </section>
</template>
<script>
import { utilService } from '../services/util.service';

export default {
    name: 'img-editor',
    props: {
        info: Object
    },
    components: {},
    data() {
        return {

        };
    },
    created() {
    },
    methods: {

        updateSrc(ev) {
            this.updateCmp('src', ev.target.value)
            this.info.el.src = ev.target.value
        },
        updateRadius(ev) {
            this.updateCmp('border-radius', ev.target.value + '%')
            this.info.el.style['border-radius'] = ev.target.value + '%'
        },
        updateCmp(att, value) {
            const { key, path, el, currCmp, elIdx } = this.info
            const originalWap = this.$store.getters.getWapToEdit

            const elCopy = utilService.copy(el)
            const copyCmp = utilService.copy(currCmp)
            const wap = utilService.copy(originalWap)


            // console.log('elIdx:', elIdx)
            if (att === 'src') {
                elCopy.src = value
            } else {
                elCopy.style[att] = value
            }
            // console.log(elCopy);
            if (elIdx !== undefined) {
                copyCmp.info[key][elIdx] = elCopy
                // console.log(copyCmp.info[key][elIdx]);
            } else {
                copyCmp.info[key] = elCopy
                // console.log(copyCmp.info[key]);
            }

            if (path.idx !== undefined) {
                wap.cmps[path.fatherIdx].cmps[path.idx] = copyCmp
                // console.log( wap.cmps[path.fatherIdx].cmps[path.idx]);
            } else {
                wap.cmps[path.fatherIdx] = copyCmp
                // console.log( wap.cmps[path.fatherIdx]);
            }

            try {
                this.$store.dispatch({ type: 'updateWap', wap })
            } catch {
                console.log('ops')
            }
        },
    },
    computed: {
        rangeValue() {
            return this.info.el.style['border-radius'] ? +this.info.el.style['border-radius'].slice(0, -1) : 0
        }
    },
    unmounted() { },
    info: function () {
        console.log(this.info);
    }

};
</script>
<style>

</style>
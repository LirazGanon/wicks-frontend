<template>
    <section class="img-cmp-editor flex column" v-if="cmp">
        <h2>Edit</h2>
        <img :src="src" :style="info.style">
        <label>
            <span>src </span>
            <input type="text" :value="src" @change="updateSrc">
        </label>
        <label>
            <span>Border-radius </span>
            <input type="range" min="0" max="50" :value="rangeValue" @input="updateRadius">
        </label>
        <!-- :value="+info?.style['border-radius'].slice(0,-2)" -->
    </section>
</template>
<script>
export default {
    name: 'img-editor',
    props: {
        info: Object,
        cmp: Object
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

            let wap = this.$store.getters.getWapToEdit
            const cmpIdx = wap.cmps.findIndex(cmp => cmp.id === this.info.id)
            const { key, idx } = this.info
            if (key === 'bgImg') {
                this.cmp.info[key].src = ev.target.value
            } else {
                this.cmp.info[key][idx].src = ev.target.value
            }
            wap = JSON.parse(JSON.stringify(wap))
            wap.cmps[cmpIdx] = JSON.parse(JSON.stringify(this.cmp))
            try {
                this.$store.dispatch({ type: 'updateWap', wap })
            } catch {
                console.log('ops')
            }
        },
        updateRadius(ev) {
            console.log(ev.target.value);
            this.updateCmp('border-radius', ev.target.value + '%')
            this.info.style['border-radius'] = ev.target.value + '%'
        },
        updateCmp(att, value) {
            let wap = this.$store.getters.getWapToEdit
            const cmpIdx = wap.cmps.findIndex(cmp => cmp.id === this.info.id)
            const cmp = JSON.parse(JSON.stringify(this.cmp))
            const { key, idx } = this.info
            if (key === 'bgImg') {
                cmp.info[key].style[att] = value
            } else {
                cmp.info[key][idx].style[att] = value
            }
            wap = JSON.parse(JSON.stringify(wap))
            wap.cmps[cmpIdx] = cmp
            try {
                this.$store.dispatch({ type: 'updateWap', wap })
            } catch {
                console.log('ops')
            }
        },
    },
    computed: {
        src() {
            const { key, idx, isContainer, currCmp } = this.info
            console.log(key, idx, isContainer);
            if (isContainer) {
                console.log('this.cmp.info:', this.cmp.info)
                return this.cmp.info.cmps.find(cmp => cmp.type === currCmp).info.imgs[idx].src
            }
            if (key === 'bgImg') {
                console.log('this.cmp.info:', this.cmp.info)
                return this.cmp.info[key].src
            }
            else {
                console.log('this.cmp.info:', this.cmp.info)
                return this.cmp.info[key][idx].src
            }
            // return key === 'bgImg' ? this.cmp.info[key].src :
        },
        rangeValue() {
            return this.info.style['border-radius'] ? +this.info.style['border-radius'].slice(0, -1) : 0
        }
    },
    unmounted() { },
};
</script>
<style>

</style>
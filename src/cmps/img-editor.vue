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
    props: { info: Object },
    components: {},
    data() {
        return {
            cmp: null
        };
    },
    created() {
        const wap = this.$store.getters.getWapToEdit
        const cmp = wap.cmps.find(cmp => {
            if (cmp.type === 'wap-container') {
                return cmp.info.cmps.find(item => {
                    if (item.type === 'wap-gallery') {
                        console.log('item:', item.id)
                        console.log('infoId', this.info.id)
                        return item.id === this.info.id

                    }

                });
            }
            return cmp.id === this.info.id
        })
        // console.log('this.info:', this.info)
        // console.log('wap', wap);
        console.log('cmp', cmp);
        this.cmp = JSON.parse(JSON.stringify(cmp))
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
            const { key, idx } = this.info
            if (key === 'bgImg') {
                this.cmp.info[key].style[att] = value
            } else {
                this.cmp.info[key][idx].style[att] = value
            }
            wap = JSON.parse(JSON.stringify(wap))
            wap.cmps[cmpIdx] = JSON.parse(JSON.stringify(this.cmp))
            try {
                this.$store.dispatch({ type: 'updateWap', wap })
            } catch {
                console.log('ops')
            }
        },
    },
    computed: {
        src() {
            const { key, idx, isContainer } = this.info
            console.log(key, idx, isContainer);
            if (isContainer) {
                console.log('this.cmp.info:', this.cmp.info)
                return this.cmp.info.cmps[1].info.imgs[idx].src
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
<template>
    <section class="wap-gallery" :class="cmp.classes">
        <img v-for="(img,idx) in cmp.info.imgs" :src="img.src" alt="" @click="openEditor('imgs', idx)" :style="img.style">
    </section>



   

</template>
<script>
export default {
    name: 'dynamic-gallery-cmp',
    props: { cmp: Object },
    components: {},
    data() {
        return {};
    },
    created() { },
    methods: {
        openEditor(key, idx) {
            const el = (idx !== undefined) ? this.cmp.info[key][idx] : this.cmp.info[key]
            const wapContent = {
                key,
                id: this.cmp.id,
                idx,
                type: el.type,
                style: el.style,
                isContainer:true
            }
            // console.log(wapContent);

            this.$emit('openEditor', wapContent)
        },
        updateCmp(ev) {
            let wap = this.$store.getters.getWapToEdit
            const idx = wap.cmps.findIndex(cmp => cmp.id === this.cmp.id)
            let cmpCopy = JSON.parse(JSON.stringify(this.cmp))
            cmpCopy.info[ev.target.dataset.type].txt = ev.target.innerText
            wap = JSON.parse(JSON.stringify(wap))
            wap.cmps[idx] = cmpCopy
            try {
                this.$store.dispatch({ type: 'updateWap', wap })
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
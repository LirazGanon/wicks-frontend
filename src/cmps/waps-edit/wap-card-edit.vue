<template>
    <section class="wap-card" v-if="cmp.info">
        <h1 contenteditable="true" @click="openEditor('heading')" :style="cmp.info.heading?.style" @input="updateCmp">{{ cmp.info.heading?.txt }}</h1>
        <p contenteditable="true">{{ cmp.info.subHeading?.txt }}</p>
        <p v-for="txt in cmp.info.texts" contenteditable="true">{{ txt.txt }}</p>
        <button v-for="btn in cmp.info.btns" contenteditable="true">{{ btn.txt }}</button>
    </section>



    <!-- <a href="" v-for="(l, idx) in nav.info.links" contenteditable="true" @click="openEditor('links', idx)"
        :style="nav.info.links[idx].style" @input="updateCmp($event, idx)" data-type="links"> {{ l.txt
        }}</a> -->

</template>
<script>
export default {
    name: 'dynamic-review-cmp',
    props: { cmp: Object, cmpId: String },
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
                isContainer: true,
                fatherEl: 'wap-card'
            }
            this.$emit('openEditor', wapContent)
        },
        updateCmp(ev, innerIdx) {
            let wap = this.$store.getters.getWapToEdit
            const cmpIdx = wap.cmps.findIndex(cmp => cmp.id === this.cmpId)
            let cmpCopy = JSON.parse(JSON.stringify(this.cmp))
            wap = JSON.parse(JSON.stringify(wap))

            // console.log('cmpCopy:',  cmpCopy.info.links[innerIdx].txt)
            // console.log('wap',wap.cmps[cmpIdx].info.nav);
            // console.log('cmpCopy:', cmpCopy)
            // console.log(wap.cmps[cmpIdx].info.nav.info.links[innerIdx]);
            cmpCopy.info.links[innerIdx].txt = ev.target.innerText
            wap.cmps[cmpIdx].info.nav = cmpCopy
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
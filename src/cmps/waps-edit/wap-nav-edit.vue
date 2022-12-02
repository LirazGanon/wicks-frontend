<template>
    <nav class="wap-nav flex">

        <!-- TODO:START -->

        <a href="" v-for="(l, idx) in nav.info.links" contenteditable="true" @click="openEditor('links', idx)"
            :style="nav.info.links[idx].style" @input="updateCmp($event, idx)" data-type="links"> {{ l.txt
            }}</a>

    </nav>

</template>
<script>
export default {
    name: 'dynamic-nav-cmp',
    props: { nav: Object, cmpId: String },
    components: {},
    data() {
        return {
            cmp: null
        };
    },
    created() {
        this.cmp = this.nav
        console.log(this.cmpId);
    },
    methods: {
        openEditor(key, idx) {
            const el = (idx !== undefined) ? this.cmp.info[key][idx] : this.cmp.info[key]

            const wapContent = {
                key,
                id: this.cmpId,
                idx,
                type: el.type,
                style: el.style,
                fatherEl: 'nav'
            }
            this.$emit('openEdit', wapContent)
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
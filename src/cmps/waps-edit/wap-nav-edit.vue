<template>
    <nav class="wap-nav flex">
      
        <!-- TODO:START -->

        <a href="" v-for="(l, idx) in nav.info.links" 
       
        contenteditable="true" 
        @click="openEditor('links', idx)"
        :style="nav.info.links[idx].style"
        @input="updateCmp"
        data-type="links"> {{ l.txt
        }}</a>

    </nav>

</template>
<script>
export default {
    name: 'dynamic-nav-cmp',
    props: { nav: Object , cmpId:String},
    components: {},
    data() {
        return {
            cmp:null
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
            console.log(wapContent);
            this.$emit('openEdit', wapContent)
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
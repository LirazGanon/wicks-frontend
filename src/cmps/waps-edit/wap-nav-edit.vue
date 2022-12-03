<template>
    <nav class="wap-nav flex" v-if="cmp.info.links">

        <!-- TODO:START -->

        <!-- <a href="" v-for="(l, idx) in nav.info.links" contenteditable="true" @click="openEditor('links', idx)"
            :style="nav.info.links[idx].style" @input="updateCmp($event, idx)" data-type="links"> {{ l.txt
            }}</a> -->


        <a v-for="(l, idx) in cmp.info.links" @click="openEditor('links', idx)">
            <span>
                {{ l.txt }}
            </span>
        </a>
        <!-- <pre style="background:green;font-size:20px;color:black">{{ cmp }}</pre> -->

    </nav>

</template>
<script>
export default {
    name: 'dynamic-nav-cmp',
    props: { cmp: Object, path: Object },
    components: {},
    data() {
        return {
        };
    },
    created() {
        console.log(this.cmp);
    },
    methods: {
        openEditor(key, i) {
            const el = (i !== undefined) ? this.cmp.info[key][i] : this.cmp.info[key]

            const { fatherIdx, idx } = this.path

            const wap = this.$store.getters.getWapToEdit

            const puk = wap.cmps[fatherIdx].cmps[idx]

            console.log('el:', el)
            console.log('puk:', puk.info[key][i])

            // const wapContent = {
            //     key,
            //     idx,
            //     el,
            //     currCmp: this.cmp
            // }

            console.log(a);
            console.log(wapContent)
            // this.$emit('openEditor', wapContent)
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
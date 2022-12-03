<template>
    <nav class="wap-nav flex" v-if="cmp.info.links">

        <!-- TODO:START -->

        <!-- <a href="" v-for="(l, idx) in nav.info.links" contenteditable="true" @click="openEditor('links', idx)"
            :style="nav.info.links[idx].style" @input="updateCmp($event, idx)" data-type="links"> {{ l.txt
            }}</a> -->


        <a v-for="(l, idx) in cmp.info.links" @click.stop="openEditor('links', idx)" :style="l.style">
            <span>
                {{ l.txt }}
            </span>
        </a>
        <!-- <pre style="background:green;font-size:20px;color:black">{{ cmp }}</pre> -->

    </nav>

</template>
<script>
import { utilService } from '../../services/util.service';

export default {
    name: 'dynamic-nav-cmp',
    props: { cmp: Object, path: Object },
    components: {},
    data() {
        return {
        };
    },
    created() {
    },
    methods: {
        openEditor(key, idx) {
            const el = (idx !== undefined) ? this.cmp.info[key][idx] : this.cmp.info[key]

            const wapContent = {
                key,
                path: this.path,
                el,
                currCmp: this.cmp,
                elIdx: idx
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
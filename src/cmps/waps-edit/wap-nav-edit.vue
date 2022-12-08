<template>
    <nav class="wap-nav flex" v-if="cmp.info.links" :class="{'menu-open':menuOpen}">

        <a v-for="(l, idx) in cmp.info.links" @mousedown.stop="openEditor('links', idx)" :style="l.style" @click.stop
            contenteditable="true" @blur="updateCmp($event, 'links', idx)">
            <span>
                {{ l.txt }}
            </span>
        </a>

    </nav>



</template>
<script>
import { utilService } from '../../services/util.service';

export default {
    name: 'dynamic-nav-cmp',
    props: { cmp: Object, path: Object, menuOpen: Boolean },
    components: {},
    data() {
        return {
        };
    },
    created() {
    },
    methods: {
        openEditor(key, idx) {
            let el = (idx !== undefined) ? this.cmp.info[key][idx] : this.cmp.info[key]
            el = utilService.copy(el)

            const wapContent = {
                key,
                path: this.path,
                el,
                currCmp: this.cmp,
                elIdx: idx
            }
            this.$emit('openEditor', wapContent)
        },
        updateCmp(ev, key, idx) {
            const path = this.path
            let cmp = utilService.copy(this.cmp)
            if (cmp.info[key][idx].txt === ev.target.innerText) return

            cmp.info[key][idx].txt = ev.target.innerText

            try {
                this.$store.dispatch({ type: 'updateWap', cmp, path })
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
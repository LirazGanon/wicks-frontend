<template>
    <nav class="wap-nav flex" v-if="cmp.info.links">

        <!-- TODO:START -->

        <!-- <a href="" v-for="(l, idx) in nav.info.links" contenteditable="true" @click="openEditor('links', idx)"
            :style="nav.info.links[idx].style" @input="updateCmp($event, idx)" data-type="links"> {{ l.txt
            }}</a> -->


        <a v-for="(l, idx) in cmp.info.links" @click.stop="openEditor('links', idx)" :style="l.style"
            contenteditable="true" @input="updateCmp($event,'links',idx)">
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
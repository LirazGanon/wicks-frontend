<template>
    <section class="wap-bg-img bakery full" :style="{ backgroundImage: 'url(' + cmp.info.img.src + ')' }" @click="openEditor('img')" @mousedown="$emit('acceptDrop')" :class="selected">
        <!-- <img :src="cmp.info.img.src" alt=""> -->
    </section>
</template>
<script>
import { utilService } from '../../services/util.service';

export default {
    name: 'wap-bg-img',
    props: { cmp: Object,  isSelected: Boolean  },
    components: {},
    data() {
        return {};
    },
    created() { },
    methods: {
        openEditor(key, idx) {
            let el = (idx !== undefined) ? this.cmp.info[key][idx] : this.cmp.info[key]
            el = utilService.copy(el)
            const wapContent = {
                key,
                path: this.getPath(),
                el,
                currCmp: this.cmp,
                elIdx: idx
            }
            this.$emit('openEditor', wapContent)
        },
        getPath(idx) {
            const wap = this.$store.getters.getWapToEdit
            const cmpIdx = wap.cmps.findIndex(cmp => cmp.id === this.cmp.id)
            return { fatherIdx: cmpIdx, idx, id: this.cmp.id }
        }
    },
    computed: {
        selected() {
            return this.isSelected ? 'selected1' : ''
        }
    },
    unmounted() { },
};
</script>
<style>

</style>
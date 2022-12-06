<template>
    <section class="wap-gallery" :class="cmp.classes">
        <img 
            v-for="(img,idx) in cmp.info.imgs"
            :src="img.src"
            alt="" 
            @mousedown.stop="openEditor('imgs', idx)"
            @click.stop
            @dragstart.prevent
           :style="img.style"
           >
    </section>



   

</template>
<script>
import { utilService } from '../../services/util.service';

export default {
    name: 'dynamic-gallery-cmp',
    props: { cmp: Object ,  path: Object},
    components: {},
    data() {
        return {};
    },
    created() { },
    methods: {
        openEditor(key, i) {
            let el = (i !== undefined) ? this.cmp.info[key][i] : this.cmp.info[key]
            el = utilService.copy(el)
            const wapContent = {
                key,
                path: this.path,
                el,
                currCmp: this.cmp,
                elIdx: i
            }
            this.$emit('openEditor', wapContent)
        }
    },
    computed: {},
    unmounted() { },
};
</script>
<style>

</style>
<template>
    <section class="wap-img">

        <img v-for="(img, idx) in cmp.info.imgs" :src="img.src" alt="" @click.stop="openEditor('imgs', idx)"
            >
    </section>

</template>
<script>
import { utilService } from '../../services/util.service';

export default {
    name: 'dynamic-review-cmp',
    props: { cmp: Object },
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
                id: this.cmp.id,
                idx,
                type: el.type,
                style: el.style,
                isContainer:true,
                currCmp:'wap-img'
            }

            this.$emit('openEditor', wapContent)
        },
    },
    computed: {},
    unmounted() { },
};
</script>
<style>

</style>
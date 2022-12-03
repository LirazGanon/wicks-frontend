<template>
    <section class="wap-gallery" :class="cmp.classes">
        <img 
            v-for="(img,idx) in cmp.info.imgs"
            :src="img.src"
            alt="" 
            @click="openEditor('imgs', idx)"
           :style="img.style"
           >
    </section>



   

</template>
<script>
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
            const el = (i !== undefined) ? this.cmp.info[key][i] : this.cmp.info[key]
            const wapContent = {
                key,
                path: this.path,
                el,
                currCmp: this.cmp,
                elIdx: i
            }
            console.log(wapContent);
            this.$emit('openEditor', wapContent)
        }
    },
    computed: {},
    unmounted() { },
};
</script>
<style>

</style>
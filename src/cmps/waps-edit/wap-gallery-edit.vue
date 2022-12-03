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
    props: { cmp: Object },
    components: {},
    data() {
        return {};
    },
    created() { },
    methods: {
        openEditor(key, idx) {
            const el = (idx !== undefined) ? this.cmp.info[key][idx] : this.cmp.info[key]
            const wapContent = {
                key,
                id: this.cmp.id,
                idx,
                type: el.type,
                style: el.style,
                isContainer:true,
                currCmp:'wap-gallery'
            }
            // console.log(wapContent);

            this.$emit('openEditor', wapContent)
        },
    },
    computed: {},
    unmounted() { },
};
</script>
<style>

</style>
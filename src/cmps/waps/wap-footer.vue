<template>
    <section class="main-layout full"  :style="cmp.style">
        <section class="wap-footer" :class="cmp.classes" >

            <p v-if="(cmp.info?.logo?.type==='txt')" class="logo" :style="cmp.info?.logo?.style">{{ cmp.info?.logo?.txt }}</p>
            <img v-if="(cmp.info?.logo?.type==='img')" class="logo" :src="cmp.info?.logo?.src">
            <p class="copyright" >{{ cmp.info?.copyright?.txt }}</p>
        </section>
    </section>

</template>
<script>
export default {
    name: 'dynamic-footer-cmp',
    props: { cmp: Object },
    components: {},
    data() {
        return {};
    },
    created() { },
    methods: {},
    computed: {},
    unmounted() { },
};
</script>
<style>

</style>
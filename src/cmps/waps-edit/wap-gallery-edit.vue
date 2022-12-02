<template>
    <section class="wap-gallery" :class="cmp.classes">
        <img v-for="img in cmp.info.imgs" :src="img.src" alt="">
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
    methods: {},
    computed: {},
    unmounted() { },
};
</script>
<style>

</style>
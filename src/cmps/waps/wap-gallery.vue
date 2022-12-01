<template>
    <section class="wap-gallery">
        <img v-for="img in cmp.info.imgs" :src="img.src" alt="">
    </section>
    <!-- <pre>{{cmp}}</pre> -->

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
<template>
    <section class="wap-gallery" :class="cmp.classes">
        <img class="animate__animated animate__slideInRight" v-for="img in cmp.info.imgs" :src="img.src">
    </section>

</template>
<script>

import 'animate.css'

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
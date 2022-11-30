<template>

    <section class="wap-hero bakery">

        <h1>{{ info.heading.txt }}</h1>
        <h6>{{ info.subHeading.txt }}</h6>
        <button v-for="btn in info.btns">
            {{ btn.txt }}
        </button>

        <img :src="img.src" v-for="img in info.imgs" alt="" class="wap-img">
        <img :src="info.bgImg.src" alt="" class="wap-bg-img">
        <!-- <pre>
            {{ info }}
        </pre> -->

    </section>

</template>
<script>
export default {
    name: 'dynamic-hero-cmp',
    props: { info: Object },
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
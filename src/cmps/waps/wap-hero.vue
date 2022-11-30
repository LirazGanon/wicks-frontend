<template>

    <section class="wap-hero bakery">

        <h1>{{ cmp.info.heading.txt }}</h1>
        <p>{{ cmp.info.subHeading.txt }}</p>
        <button v-for="btn in cmp.info.btns">
            {{ cmp.btn.txt }}
        </button>

        <img :src="img.src" v-for="img in cmp.info.imgs" alt="" class="wap-img">
        <img :src="cmp.info.bgImg.src" alt="" class="wap-bg-img">
        

    </section>

</template>
<script>
export default {
    name: 'dynamic-hero-cmp',
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
<template>
    <section class="main-layout full" :style="cmp.style">

        <section class="wap-hero bakery  " >

            <h1>{{ cmp.info.heading.txt }}</h1>
            <p>{{ cmp.info.subHeading.txt }}</p>
            <button v-for="btn in cmp.info.btns">
                {{ btn.txt }}
            </button>

            <img :src="img.src" v-for="img in cmp.info.imgs" alt="" class="wap-img">
            <img :src="cmp.info.bgImg.src" alt="" class="wap-bg-img">

        </section>
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

};
</script>
<style>

</style>
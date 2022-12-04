<template>

    <!-- <pre>{{cmp.info}}</pre> -->
    <section class="wap-card" :class="cmp.info.classes">
        <img  v-if="cmp.info.imgs" v-for="img in cmp.info.imgs" :src="img.src" alt="">
        <h1 v-if="cmp.info.heading">{{ cmp.info.heading?.txt }}</h1>
        <p v-if="cmp.info.subHeading">{{ cmp.info.subHeading?.txt }}</p>
        <p v-if="cmp.info.texts" v-for="txt in cmp.info.texts">{{ txt.txt }}</p>
        <button v-if="cmp.info.btns" v-for="btn in cmp.info.btns">{{ btn.txt }}</button>
    </section>

</template>
<script>
export default {
    name: 'dynamic-review-cmp',
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
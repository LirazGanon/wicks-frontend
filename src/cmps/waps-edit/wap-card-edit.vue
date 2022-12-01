<template>
    <section class="wap-card" v-if="cmp.info">
        <h1  contenteditable="true">{{ cmp.info.heading?.txt }}</h1>
        <p contenteditable="true">{{ cmp.info.subHeading?.txt }}</p>
        <p v-for="txt in cmp.info.texts" contenteditable="true">{{ txt.txt }}</p>
        <button v-for="btn in cmp.info.btns" contenteditable="true">{{ btn.txt }}</button>
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
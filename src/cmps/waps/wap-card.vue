<template>
    <section class="wap-card" >
        <h1>{{ cmp.info.heading.txt }}</h1>
        <p>{{ cmp.info.subHeading?.txt }}</p>
        <button v-for="btn in cmp.info.btns">{{btn.txt}}</button>
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
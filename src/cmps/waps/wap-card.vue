<template>
    <section class="wap-card">
        <pre>{{cmp}}</pre>
        <h1>{{cmp.heading.txt}}</h1>
        <h4>card - {{ cmp.id }}</h4>
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
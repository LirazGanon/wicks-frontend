<template>
    <h4>container- {{ cmp.info.id }} </h4>

    <pre>{{cmp.info}}</pre>

    <section class="wap-container">
        <h4>container-{{ cmp.info.heading }}</h4>
    </section>
</template>
<script>
export default {
    name: 'dynamic-container-cmp',
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
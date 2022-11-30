<template>
    <h4>container- {{ info.id }} </h4>

    <pre>{{info}}</pre>

    <section class="wap-container">
    </section>
</template>
<script>
export default {
    name: 'dynamic-container-cmp',
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
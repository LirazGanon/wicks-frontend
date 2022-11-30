<template>
    <section class="wap-form">
        <pre>{{ info }}</pre>

        <!-- <h4>form-{{ info.heading.txt }}</h4> -->
    </section>

</template>
<script>
export default {
    name: 'dynamic-form-cmp',
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
<template>
    <section class="wap-footer">
       <!-- <pre>
        {{ info }}
       </pre> -->
        <h4>footer-{{ info.logo.url }}</h4>
    </section>

</template>
<script>
export default {
    name: 'dynamic-footer-cmp',
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
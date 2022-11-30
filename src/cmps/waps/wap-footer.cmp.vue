<template>
    <section class="wap-footer">
       <!-- <pre>
        {{ info }}
       </pre> -->
        <h4>footer-{{ cmp.info.logo.url }}</h4>
    </section>

</template>
<script>
export default {
    name: 'dynamic-footer-cmp',
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
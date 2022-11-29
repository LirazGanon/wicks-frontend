<template>
       <h2>{{info?.txt || 'header'}}</h2>
</template>
<script>
export default {
    name: 'dynamic-header-cmp',
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
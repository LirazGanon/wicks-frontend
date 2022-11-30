<template>
       <section class="wap-header">
           <h4>Img{{(info.logo.img || info.logo.txt)}}</h4>

       </section>
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
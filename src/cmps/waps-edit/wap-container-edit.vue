<template>
    <!-- <h2>{{ info }}</h2> -->

    <section class="wap-container">
        <h4>container-{{ cmp.info.heading }}</h4>
    </section>
</template>
<script>


import wapGallery from './wap-gallery-edit.vue'
export default {
    name: 'dynamic-container-cmp',
    props: { cmp: Object },
    components: { wapGallery },
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
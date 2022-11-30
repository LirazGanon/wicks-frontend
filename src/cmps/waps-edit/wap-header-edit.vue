<template>
    <header class="wap-header bakery ">


        <div class="wap-logo flex align-center">
            <img :src="cmp.info.logo?.img" alt="" v-if="cmp.info.logo">
            <h4 v-else>{{ cmp.info.logo.txt }}</h4>
        </div>



        <wap-nav :nav="cmp.info.nav" />


    </header>
</template>
<script>

import wapNav from './wap-nav-edit.vue'
export default {
    name: 'dynamic-header-cmp',
    props: { cmp: Object },
    components: { wapNav },
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
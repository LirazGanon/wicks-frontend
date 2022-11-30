<template>
    <header class="wap-header ">


        <div class="wap-logo flex align-center">
            <img :src="info.logo?.img" alt="" v-if="info.logo.img">
            <h4 v-else>{{ info.logo.txt }}</h4>
        </div>
        <!-- <pre>{{info}}</pre> -->



        <wap-nav :nav="info.nav" />


    </header>
</template>
<script>

import wapNav from './wap-nav.cmp.vue'
export default {
    name: 'dynamic-header-cmp',
    props: { info: Object },
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
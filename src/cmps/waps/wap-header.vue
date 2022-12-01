<template>
    <header class="wap-header main-layout full" :class="cmp.classes">
        <section class="flex space-between">


            <div class="wap-logo flex align-center">
                <img :src="cmp.info.logo?.img" alt="" v-if="cmp.info.logo.img">
                <h4 v-else>{{ cmp.info.logo.txt }}</h4>
            </div>
            <!-- <pre>{{info}}</pre> -->

            <wap-nav :nav="cmp.info.nav" />

        </section>

    </header>
</template>
<script>

import wapNav from './wap-nav.vue'
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
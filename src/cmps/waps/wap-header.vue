<template>
    <header class="wap-header main-layout full" :class="cmp.classes">
        <section class="flex space-between">


            <div class="wap-logo flex align-center">
                <img :src="cmp.info.logo?.src" alt="" v-if="cmp.info.logo.src">
                <h4 v-else>{{ cmp.info.logo.txt }}</h4>
            </div>

            <component v-for="cmp in cmp.cmps" :is="cmp.type" :cmp="cmp" :menuOpen="menuOpen"/>

            <div class="burger" @click="(menuOpen = !menuOpen)">
                <span style="--i: -1"></span>
                <span style="--i: 0"></span>
                <span style="--i: 1"></span>
            </div>


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
        return {
            menuOpen:false
        };
    },
    created() { },
    methods: {},
    computed: {},
    unmounted() { },
};
</script>
<style>

</style>
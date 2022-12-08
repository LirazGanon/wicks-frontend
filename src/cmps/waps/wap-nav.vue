<template>
    <nav class="wap-nav flex" :class="{'menu-open':menuOpen}">

        <a href="#" v-for="l in cmp.info.links">
            <span v-if="(l.type)" :style="l.style">
                {{ l.txt }}
            </span>
        </a>
    </nav>

</template>
<script>
export default {
    name: 'dynamic-nav-cmp',
    props: { cmp: Object,menuOpen: Boolean },
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
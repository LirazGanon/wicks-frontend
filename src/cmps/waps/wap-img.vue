<template>
    <section class="wap-img">

        <img v-for="img in cmp.info.imgs" :src="img.src" alt="">
        
    </section>

</template>
<script>
export default {
    name: 'dynamic-review-cmp',
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
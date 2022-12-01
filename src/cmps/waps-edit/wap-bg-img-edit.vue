<template>
   <section class="wap-bg-img bakery full" :style="{backgroundImage:'url('+ cmp.info.img.src+ ')'}">
        <!-- <img :src="cmp.info.img.src" alt=""> -->
        <h2>PUKI</h2>
    </section>
</template>
<script>
export default {
    name: 'wap-bg-img',
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
<template>
    <section class="wap-img">
<!-- <pre>
    {{cmp}}
</pre> -->
        <h4>image - {{ cmp.id }}</h4>
        <img v-for="img in cmp.imgs" :src="img.src" alt="">

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
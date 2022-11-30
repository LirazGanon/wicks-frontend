<template>
    <section class="wap-reviews">
        <!-- <pre>{{info}}</pre> -->
        <h4>reviews-{{ info.heading.txt }}</h4>
    </section>

</template>
<script>
export default {
    name: 'dynamic-review-cmp',
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
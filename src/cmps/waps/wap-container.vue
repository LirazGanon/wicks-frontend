<template>
    <section>
        <h4>container- {{ cmp.id }} </h4>
    
        <!-- <pre>{{cmp.info}}</pre> -->
    
        <section class="wap-container">
            <h4>container-{{ cmp.info.heading }}</h4>
        </section>
    </section>
</template>
<script>
export default {
    name: 'dynamic-container-cmp',
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
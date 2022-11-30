<template>

    <section class="wap-hero">

        <h1>{{info.heading.txt}}</h1>
        <h6>{{info.subHeading.txt}}</h6>
        <button v-for="btn in info.btns">
            {{btn.txt}}
        </button>
        <pre>
            {{info}}
        </pre> 
    </section>

</template>
<script>
export default {
    name: 'dynamic-hero-cmp',
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
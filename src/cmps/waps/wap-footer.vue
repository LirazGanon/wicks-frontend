<template>
    <section class="wap-footer bakery">
       <!-- <pre>
        {{ cmp.info.details }}
       </pre> -->
       <!-- <h4>footer-{{ cmp.info.logo.txt}}</h4> -->
    <div v-for="txts in cmp.info.details">
        <p v-for="txt in txts">{{txt}}</p>
        <pre>{{}}</pre>
    </div>
       <p class="bakery-footer-logo">{{cmp.info.logo.txt}}</p>
    </section>

</template>
<script>
export default {
    name: 'dynamic-footer-cmp',
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
<template>
    <section class="wap-footer bakery">
       <!-- <pre>
        {{ cmp.info.details }}
       </pre> -->
       <!-- <h4>footer-{{ cmp.info.logo.txt}}</h4> -->
       <p v-for="txt in cmp.info.details.texts">{{txt}}</p>
       <p>{{cmp.info.logo.txt}}</p>
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
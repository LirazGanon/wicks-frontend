<template>
    <section class="wap-footer bakery">
       <!-- <pre>
        {{ cmp.info.details }}
       </pre> -->
       <!-- <h4>footer-{{ cmp.info.logo.txt}}</h4> -->
       <!-- <pre>{{cmp.info.details}}</pre> -->
    <div v-for="txts in cmp.info.details">
        <!-- <pre>{{txts}}</pre> -->
        <p v-for="txt in txts.texts">{{txt}}
        </p>
        <!-- <pre>{{txts}}</pre> -->
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
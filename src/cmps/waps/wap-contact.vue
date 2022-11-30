<template>
      <!-- <pre>{{info}}</pre> -->
    <pre>
        {{cmp.type}}
        {{cmp.info.cmps[0].type}}
        {{cmp.info.cmps[1].type}}
    </pre>

      <!-- <section class="wap-gallery">
        <h4>gallery-{{ info.imgs.length }}</h4>
    </section> -->

</template>
<script>
export default {
    name: 'dynamic-contact-cmp',
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
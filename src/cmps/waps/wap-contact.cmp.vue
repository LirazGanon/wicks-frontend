<template>
      <!-- <pre>{{info}}</pre> -->
    <pre>
        {{cmp.info.texts}}
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
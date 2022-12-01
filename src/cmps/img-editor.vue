<template>
    <h2>{{ info }}</h2>
    <pre>{{cmp}}</pre>
</template>
<script>
export default {
    name: 'img-editor',
    props: { info: Object },
    components: {},
    data() {
        return {
            cmp:null
        };
    },
    created() {
        const wap = this.$store.getters.getWapToEdit
        const cmp = wap.cmps.find(cmp => cmp.id === this.info.id)
        this.cmp = JSON.parse(JSON.stringify(cmp))
     },
    methods: {},
    computed: {},
    unmounted() { },
};
</script>
<style>

</style>
<template>
    <h2>{{ info }}</h2>
    <label>
        <span>color</span>
        <input type="color" v-model="cmp.style.color" @change="updateCmp">
    </label>
</template>
<script>
export default {
    name: 'text-editor',
    props: { info: Object },
    components: {},
    data() {
        return {
            cmp: null
        };
    },
    created() {
        const wap = this.$store.getters.getWapToEdit
        const cmp = wap.cmps.find(cmp => cmp.id === this.info.id)
        this.cmp = JSON.parse(JSON.stringify(cmp))
    },

    methods: {
        updateCmp() {
            let wap = this.$store.getters.getWapToEdit
            const idx = wap.cmps.findIndex(cmp => cmp.id === this.info.id)
            wap = JSON.parse(JSON.stringify(wap))
            wap.cmps[idx] = { ...this.cmp }
            try {
                this.$store.dispatch({ type: 'updateWap', wap })
            } catch {
                console.log('ops')
            }
        }
    },
    computed: {},
    unmounted() { },
};
</script>
<style>

</style>
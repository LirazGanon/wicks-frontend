<template>
    <div class="dash-card-wrapper">

        <section class="chosen-wap-display" v-if="info">

            <img v-if="info.src" :src="info.src" alt="" class="chosen-wap-img">
            <div v-else class="chosen-wap-img">placeholder</div>
            <h3>{{ info.pathName || 'GuyKing' }}</h3>
            <div class="wap-actions-dash">

                <button @click="editWap(info._id)">Edit</button>
                <button @click="viewTemplate(info._id)">Preview</button>
            </div>

        </section>
    </div>
</template>
<script>
export default {
    name: 'chart',
    props: {
        info: Object
    },
    components: {},
    data() {
        return {};
    },
    created() { },
    methods: {
        async editWap(wapId) {
            this.$emit('setIsLoading', true)
            console.log(wapId)
            const wap = await this.$store.dispatch({ type: 'setWapToEdit', wapId })
            console.log(wap)
            this.$router.push(`/wap/edit/${wap._id}`);
            this.$emit('setIsLoading', false)
        },
        viewTemplate(wapId) {
            this.$router.push({ path: `/wap/${wapId}` });
            console.log(this.template)
        },
    },
    computed: {},
    unmounted() { },
};
</script>
<style>

</style>
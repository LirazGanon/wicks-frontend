<template>
    <div class="dash-card-wrapper">

        <section class="chosen-wap-display" v-if="info">


            <img class="prev-img" :src="info.src" alt="Site preview image">
            <h3>{{ info.pathName || 'My-site' }}</h3>
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
            // console.log(wapId)
            const wap = await this.$store.dispatch({ type: 'setWapToEdit', wapId })
            // console.log(wap)
            this.$router.push(`/wap/edit/${wap._id}`);
            this.$emit('setIsLoading', false)
        },
        viewTemplate(wapId) {
            this.$router.push({ path: `/wap/${wapId}`, target: '_blank' });
        },
    },
    computed: {},
    unmounted() { },
};
</script>
<style>

</style>
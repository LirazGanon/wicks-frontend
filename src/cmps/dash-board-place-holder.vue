<template>
    <div class="main-dash-placeholder">
        <div></div>
        <section>
            <div class="ps-dush-top">

                <h2>Welcome {{ user.fullname }}! </h2>
            </div>
            <div class="dash-placeholder-txt">

                <p> Seems like your'e new to Wicks.in</p>
                <p>Here you can pick one of our favorite and best seller templates</p>
                <p> Or even start from scratch</p>
            </div>

            <div class="carousel">
                <div class="block text-center" m="t-4" v-if="temp">
                    <el-carousel trigger="click" height="150px">
                        <el-carousel-item v-for="item in temp" :key="item">
                            <img :src="item.src" alt="" v-if="item.src" @click="editWap(item._id)">
                            <div class="placeholder" v-else @click="editWap(item._id)"> Clean Sheet</div>

                        </el-carousel-item>
                    </el-carousel>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
export default {
    name: 'dash-board-place-holder',
    props: {
        user: Object,
        temp: Array
    },
    components: {},
    data() {
        return {};
    },
    created() {
        this.$store.dispatch({ type: 'loadTemplates' })
    },
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
            this.$router.push({ path: `/wap/${wapId}` });
            // console.log(this.template)
        },
    },
    computed: {
    },
    unmounted() { },
};
</script>
<style scoped>
.placeholder {
    height: 100%;
    display: grid;
    place-content: center;
    font-weight: 900;
}
</style>
<template>

    <section class="main-layout full" :style="cmp.style">

        <section class="wap-hero " :class="cmp.classes">

            <h1 contenteditable="true">{{ cmp.info.heading.txt }}</h1>
            <p contenteditable="true">{{ cmp.info.subHeading.txt }}</p>
            <button  contenteditable="true" v-for="btn in cmp.info.btns">
                {{ btn.txt }}
            </button>

            <img :src="img.src" v-for="img in cmp.info.imgs" alt="" class="wap-img" @click="openEditor">
            <img :src="cmp.info.bgImg.src" alt="" class="wap-bg-img">

        </section>
    </section>

</template>
<script>
export default {
    name: 'dynamic-hero-cmp',
    props: { cmp: Object },
    components: {},
    data() {
        return {};
    },
    created() { },
    methods: {

        openEditor(){
            console.log(this.cmp.id);
        }
    },
    computed: {},
    unmounted() { },
};
</script>
<style>

</style>
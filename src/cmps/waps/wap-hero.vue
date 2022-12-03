<template>
    <section class="main-layout full" :style="cmp.style">

        <section class="wap-hero " :class="cmp.classes">

            <h1 v-if="cmp.info.heading"> {{ cmp.info.heading.txt }}</h1>
            <p v-if="cmp.info.subHeading">{{ cmp.info.subHeading.txt }}</p>
            <button v-if="cmp.info.btns" v-for="btn in cmp.info.btns">
                {{ btn.txt }}
            </button>

            <section v-for="img in cmp.info.imgs">
                <img :src="img.src"  alt="" class="wap-img" :style="img.style">
            </section>

            

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

};
</script>
<style>

</style>
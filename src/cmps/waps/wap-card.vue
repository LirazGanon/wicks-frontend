<template>

    <section class="wap-card" :class="(cmp.classes +' '+ cmp.animated)">
       
        <section class="card-details">

            <h1 v-if="cmp.info.heading" :style="cmp.info.heading?.style">{{ cmp.info.heading?.txt }}</h1>
            <p v-if="cmp.info.subHeading" :style="cmp.info.subHeading?.style">{{ cmp.info.subHeading?.txt }}</p>
            <p v-if="cmp.info.texts" v-for="txt in cmp.info.texts" :style="txt?.style">{{ txt.txt }}</p>
            <span>
                <p v-if="cmp.info.price" :style="cmp.info.price?.style">{{ localeCurrency }}</p>
                <button v-if="cmp.info.btns" v-for="btn in cmp.info.btns" :style="btn.style">{{ btn.txt }}</button>
            </span>
            </section>
            <img v-if="cmp.info.imgs" v-for="img in cmp.info.imgs" :src="img.src" :style="img.style"  alt="">
    </section>

</template>
<script>
export default {
    name: 'dynamic-review-cmp',
    props: { cmp: Object },
    components: {},
    data() {
        return {};
    },
    created() { },
    methods: {},
    computed: {
        localeCurrency() {
            return this.cmp.info.price.txt.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
        }        
    },
};
</script>
<style>

</style>
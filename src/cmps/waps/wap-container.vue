<template>

    <section class="main-layout full  wap-container-wrapper" :style="cmp.style" :class="cmp.classes">
   
        <section class="wap-container" :class="cmp.classes">
            <h1 v-if="cmp.info.heading?.txt" :style="cmp.info.heading.style">
                {{ cmp.info.heading.txt }}

            </h1>


            <div v-for="childCmp in cmp.cmps">
                <component :is="(childCmp.type)" :cmp="childCmp" :cmpId="cmp.id" />
            </div>

            <div v-if="cmp.info.price">{{ cmp.info.price }}</div>

            <section class="wap-img" v-if="cmp.info.imgs">
                <img v-for="img in cmp.info.imgs" :src="img.src" alt="" :style="img.style">
            </section>

        </section>

    </section>

</template>

<script>
import wapImg from './wap-img.vue'
import wapBgImg from './wap-bg-img.vue'
import wapCard from './wap-card.vue'

import wapGallery from './wap-gallery.vue'

export default {

    name: 'dynamic-container-cmp',
    props: { cmp: Object },
    components: {
        wapImg,
        wapCard,
        wapGallery,
        wapImg,
        wapBgImg
    },
    data() {
        return {};
    },
    created() { },
    methods: {},
    computed: {

    },
    unmounted() { },
};
</script>
<style>

</style>
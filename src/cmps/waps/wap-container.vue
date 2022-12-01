<template>

    <section class="main-layout full" :style="cmp.style">

        <section class="wap-container" :class="cmp.classes">
            <div v-for="childCmp in cmp.info.cmps">
                <component :is="(childCmp.type || 'wapHeader')" :cmp="childCmp" />
            </div>

        </section>
    </section>

</template>

<script>
import wapImg from './wap-img.vue'
import wapCard from './wap-card.vue'

import wapGallery from './wap-gallery.vue'


export default {

    name: 'dynamic-container-cmp',
    props: { cmp: Object },
    components: {
        wapImg,
        wapCard,
        wapGallery
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
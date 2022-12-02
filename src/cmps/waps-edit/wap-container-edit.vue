<template>
    <!-- <h2>{{ info }}</h2> -->
    <section class="main-layout full" :style="cmp.style">

        <section class="wap-container" :class="cmp.classes">
            <div v-for="childCmp in cmp.info.cmps">
                <component :is="(childCmp.type || 'wapHeader')" :cmp="childCmp" @openEditor="puk" />
            </div>

        </section>
    </section>

</template>
<script>


import wapGallery from './wap-gallery-edit.vue'

import wapImg from './wap-img-edit.vue'
import wapCard from './wap-card-edit.vue'

export default {
    name: 'dynamic-container-cmp',
    props: { cmp: Object },
    components: { wapGallery, wapImg, wapCard },
    data() {
        return {};
    },
    created() { },
    methods: {
          puk(payload) {
            this.$emit('openEditor', payload)
        },
    },
    computed: {},
    unmounted() { },
};
</script>
<style>

</style>
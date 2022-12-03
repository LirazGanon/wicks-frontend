<template>

    <div class="wap-view">
        <div v-for="item in view.cmps" :key="item.id">
            <div class="main-layout full">
<!-- <pre>{{item}}</pre> -->
                <component :is="(item.type || 'wapHeader')" :cmp="item" />
                <!-- <pre>{{item}}</pre> -->

            </div>
        </div>
    </div>

</template>
<script>

import { Container, Draggable } from "vue3-smooth-dnd";

import wapHeader from '../cmps/waps/wap-header.vue'
import wapHero from '../cmps/waps/wap-hero.vue'
import wapForm from '../cmps/waps/wap-form.vue'
import wapContainer from '../cmps/waps/wap-container.vue'

import wapContact from '../cmps/waps/wap-contact.vue'
import wapReviews from '../cmps/waps/wap-reviews.vue'
import wapBgImg from '../cmps/waps/wap-bg-img.vue'
import wapGallery from '../cmps/waps/wap-gallery.vue'

import wapFooter from '../cmps/waps/wap-footer.vue'


import { wapService } from '../services/wap.service.local.js'

export default {
    name: 'variable',
    props: {},
    components: { Draggable, Container, wapHeader, wapHero, wapForm, wapContainer, wapContact, wapReviews, wapFooter, wapBgImg, wapGallery },
    data() {
        return {
            view: {}
        };
    },
    created() {
        this.getCurrWap()
    },
    methods: {
        async getCurrWap() {
            const id = this.$route.params.wapId
            const wap = await wapService.getById(id)
            this.view = wap
        }
    },
    computed: {},
    unmounted() { },
};
</script>
<style>

</style>
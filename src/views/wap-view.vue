<template>


    <div class="wap-view" ref="view" :class="[responsiveClass]">
        <div v-for="cmp in view.cmps" :key="cmp.id">
            <div class="main-layout full">
                <component :is="cmp.type" :cmp="cmp" />
            </div>
        </div>
    </div>
</template>
<script>

import { Container, Draggable } from "vue3-smooth-dnd";

import wapHeader from '../cmps/waps/wap-header.vue'
import wapHero from '../cmps/waps/wap-hero.vue'
import wapForm from '../cmps/waps/wap-form.vue'
import wapMap from '../cmps/waps/wap-map.vue'
import wapTube from'../cmps/waps/wap-tube.vue'
import wapContainer from '../cmps/waps/wap-container.vue'

import wapContact from '../cmps/waps/wap-contact.vue'
import wapReviews from '../cmps/waps/wap-reviews.vue'
import wapBgImg from '../cmps/waps/wap-bg-img.vue'
import wapGallery from '../cmps/waps/wap-gallery.vue'

import wapFooter from '../cmps/waps/wap-footer.vue'

// import { templateService } from '../services/template.service.js'
import { wapService } from '../services/wap.service.js'
import { templateService } from "../services/template.service";

export default {
    name: 'variable',
    props: {},
    components: { Draggable, Container, wapHeader, wapHero, wapForm,
                 wapContainer, wapContact, wapReviews, wapFooter, wapBgImg, 
                 wapGallery, wapMap, wapTube },
    data() {
        return {
            view: {},
            responsiveClass: [],

        };
    },
    created() {
       

        this.getCurrWap()
    },
    mounted() {
        new ResizeObserver(this.resized).observe(this.$refs.view)
    },
    methods: {
        async getCurrWap() {
            // TODO:ARRANGE THE PARAMS TO DIFFER BETWEEN WAP AND TEMPLATE
            const url = this.$route.params
            const { isTemplate } = this.$route.params
            // const {isTemplate }= this.$route.data
            // const wap = await wapService.getById(id)
            console.log(url)
            let wap
            if (isTemplate) {
                wap = await templateService.getTemplate(url.wapId)
            } else {
                wap = await wapService.getById(url)
            }
            // console.log(template)
            // console.log(this.view)
            this.view = wap
        },
        resized() {
            if (!this.$refs.view) return
            const { offsetWidth } = this.$refs.view
            if (offsetWidth < 550) this.responsiveClass = 'mobile'
            if (offsetWidth >= 550) this.responsiveClass = this.small()
            if (offsetWidth >= 860) this.responsiveClass = this.medium()
            if (offsetWidth >= 1024) this.responsiveClass = this.narrow()
            if (offsetWidth >= 1300) this.responsiveClass = this.normal()
            if (offsetWidth >= 1500) this.responsiveClass = this.wide()
        },
      

        small() {
            return ['small']
        },
        medium() {
            return [...this.small(), 'medium']
        },
        narrow() {
            return [...this.medium(), 'narrow']
        },
        normal() {
            return [...this.narrow(), 'normal']
        },
        wide() {
            return [...this.normal(), 'wide']
        }
    },
    computed: {},
    unmounted() { },
};
</script>
<style>

</style>
<template>
    <h2>variable</h2>


    <div v-for="item in view.cmps" :key="item.id">
        <div class="draggable-item">



            <component :is="(item.type || 'wapHeader')" :info="item.info" />



            <pre>
            {{ item.type }}
            XXXXXXXXXXXXXXXX
          </pre>
        </div>
    </div>

</template>
<script>

import { Container, Draggable } from "vue3-smooth-dnd";

import wapHeader from '../cmps/waps/wap-header.cmp.vue'
import wapHero from '../cmps/waps/wap-hero.cmp.vue'
import wapForm from '../cmps/waps/wap-form.cmp.vue'
import wapContainer from '../cmps/waps/wap-container.cmp.vue'

import wapGallery from '../cmps/waps/wap-gallery.cmp.vue'
import wapContact from '../cmps/waps/wap-contact.cmp.vue'
import wapReviews from '../cmps/waps/wap-reviews.cmp.vue'

import wapFooter from '../cmps/waps/wap-footer.cmp.vue'


import { wapService } from '../services/wap.service.local.js'

export default {
    name: 'variable',
    props: {},
    components: { Draggable, Container, wapHeader, wapHero, wapForm, wapContainer, wapGallery, wapContact, wapReviews, wapFooter },
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
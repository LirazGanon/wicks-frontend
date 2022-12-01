<template>
   
    <header class="wap-header main-layout full" :class="cmp.classes">
        <section class="flex space-between">


            <div class="wap-logo flex align-center">
                <img 
                :src="cmp.info.logo?.img" 
                v-if="cmp.info.logo.img"
                @click="openEditor('imgs', idx)"
                >
                <h4 v-else contenteditable="true"
                 @click="openEditor('logo')"
                 :style="cmp.info.logo.style"
                 @input="updateCmp"
                 data-type="logo">{{ cmp.info.logo.txt }}</h4>
            </div>
            <!-- <pre>{{info}}</pre> -->

            <wap-nav :nav="cmp.info.nav" />

        </section>

    </header>
</template>
<script>

import wapNav from './wap-nav-edit.vue'
export default {
    name: 'dynamic-header-cmp',
    props: { cmp: Object },
    components: { wapNav },
    data() {
        return {};
    },
    created() { },
    methods: {
        openEditor(key, idx) {
            const el = (idx !== undefined) ? this.cmp.info[key][idx] : this.cmp.info[key]

            const wapContent = {
                key,
                id: this.cmp.id,
                idx,
                type: el.type,
                style: el.style
            }
            this.$emit('openEditor', wapContent)
        },
        updateCmp(ev) {
            let wap = this.$store.getters.getWapToEdit
            const idx = wap.cmps.findIndex(cmp => cmp.id === this.cmp.id)
            let puk = JSON.parse(JSON.stringify(this.cmp))
            puk.info[ev.target.dataset.type].txt = ev.target.innerText
            wap = JSON.parse(JSON.stringify(wap))
            wap.cmps[idx] = puk
            try {
                this.$store.dispatch({ type: 'updateWap', wap })
            } catch {
                console.log('ops')
            }
        }
    },
    computed: {},
    unmounted() { },
};
</script>
<style>

</style>
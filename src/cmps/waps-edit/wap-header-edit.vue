<template>

    <header class="wap-header main-layout full" :class="cmp.classes">
        <section class="flex space-between">


            <div class="wap-logo flex align-center">
                <img :src="cmp.info.logo?.img" v-if="cmp.info.logo.img" @click="openEditor('imgs', idx)"
                    :style="cmp.info.logo.style">



                <h4 v-else contenteditable="true" @click="openEditor('logo')" :style="cmp.info.logo.style"
                    @input="updateCmp" data-type="logo">{{ cmp.info.logo.txt }}</h4>
            </div>

            <component v-for="(curCmp, idx) in cmp.cmps" :is="curCmp.type" :cmp="curCmp" :path="getPath()"
                @openEditor="$emit('openEditor', $event)" />


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
                path: this.getPath(),
                el,
                currCmp: this.cmp
            }
            this.$emit('openEditor', wapContent)
        },
        updateCmp(ev) {
            let wap = this.$store.getters.getWapToEdit
            const idx = wap.cmps.findIndex(cmp => cmp.id === this.cmp.id)
            let cmpCopy = JSON.parse(JSON.stringify(this.cmp))
            cmpCopy.info[ev.target.dataset.type].txt = ev.target.innerText
            wap = JSON.parse(JSON.stringify(wap))
            wap.cmps[idx] = cmpCopy
            try {
                this.$store.dispatch({ type: 'updateWap', wap })
            } catch {
                console.log('ops')
            }
        },
        getPath(idx) {
            const wap = this.$store.getters.getWapToEdit
            const cmpIdx = wap.cmps.findIndex(cmp => cmp.id === this.cmp.id)
            return { fatherIdx: cmpIdx, idx }
        }
    },
    computed: {
        getCmpIdx() {
            const wap = this.$store.getters.getWapToEdit
            const cmpIdx = wap.cmps.findIndex(cmp => cmp.id === this.cmp.id)
            return cmpIdx
        }
    },
    unmounted() { },
};
</script>
<style>

</style>
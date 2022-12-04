<template>
    <section class="main-layout full" @click="openSectionEditor" :style="cmp.style">
        <section class="wap-footer" :style="cmp.style" :class="cmp.classes">


            <p v-if="(cmp.info.logo.type === 'txt')" class="logo" contenteditable="true" @click="openEditor('logo')"
                :style="cmp.info.logo.style" @input="updateCmp($event, 'logo')">
                {{ cmp.info.logo.txt }}</p>
            <img v-if="(cmp.info.logo.type === 'img')" class="logo" src="{{ cmp.info.logo.src}}">

            <p class="copyright" contenteditable="true" @click="openEditor('copyright')"
                :style="cmp.info.copyright.style" @input="updateCmp($event, 'copyright')">{{ cmp.info.copyright.txt }}
            </p>
        </section>
    </section>

</template>
<script>
export default {
    name: 'dynamic-footer-cmp',
    props: { cmp: Object },
    components: {},
    data() {
        return {};
    },
    created() { },
    methods: {
        openSectionEditor() {

            const wapContent = {
                el: { type: 'section' },
                currCmp: this.cmp,
                path: this.getPath()
            }
            this.$emit('openEditor', wapContent)
        },
        openEditor(key, idx) {
            const el = (idx !== undefined) ? this.cmp.info[key][idx] : this.cmp.info[key]
            el = utilService.copy(el)
            const wapContent = {
                key,
                path: this.getPath(),
                el,
                currCmp: this.cmp
            }
            this.$emit('openEditor', wapContent)
        },
        updateCmp(ev, key) {
            let wap = this.$store.getters.getWapToEdit
            const idx = wap.cmps.findIndex(cmp => cmp.id === this.cmp.id)
            let cmpCopy = JSON.parse(JSON.stringify(this.cmp))
            cmpCopy.info[key].txt = ev.target.innerText
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
    computed: {},
    unmounted() { },
};
</script>
<style>

</style>
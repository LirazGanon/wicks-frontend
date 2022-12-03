<template>

    <section class="main-layout full" @click="openSectionEditor" :style="cmp.style">

        <section class="wap-hero " :style="cmp.style" :class="cmp.classes">

            <h1 contenteditable="true" @click.stop="openEditor('heading')" :style="cmp.info.heading.style" @input="updateCmp"
                data-type="heading">
                {{ cmp.info.heading.txt }}
            </h1>
            <p contenteditable="true" @click.stop="openEditor('subHeading')" :style="cmp.info.subHeading.style"
                @input="updateCmp" data-type="subHeading">{{
                        (cmp.info.subHeading.txt)
                }}</p>

            <button contenteditable="true" v-for="(btn, idx) in cmp.info.btns" @click.stop="openEditor('btns', idx)"
                :style="btn.style">
                {{ btn.txt }}
            </button>


            <img v-for="(img, idx) in cmp.info.imgs" :src="img.src" alt="" class="wap-img" :class="img.classes"
                :style="img.style" @click.stop="openEditor('imgs', idx)" />


        </section>
    </section>

</template>
<script>
export default {
    name: 'dynamic-hero-cmp',
    props: { cmp: Object },
    components: {},
    data() {
        return {}
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
            const wapContent = {
                key,
                path: this.getPath(),
                el,
                currCmp: this.cmp,
                elIdx: idx
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
    computed: {},
    unmounted() { },
};
</script>
<style>

</style>
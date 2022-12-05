<template>

    <section class="main-layout full" @click="openSectionEditor" :style="cmp.style">

        <section class="wap-hero " :style="cmp.style" :class="cmp.classes">

            <h1 contenteditable="true" @click.stop="openEditor('heading')" :style="cmp.info.heading.style"
                @input="updateCmp($event, 'heading')">
                {{ cmp.info.heading.txt }}
            </h1>
            <p contenteditable="true" @click.stop="openEditor('subHeading')" :style="cmp.info.subHeading.style"
                @input="updateCmp($event, 'subHeading')">{{
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
import { utilService } from '../../services/util.service';

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

            const payload = {
                el: { type: 'section' },
                currCmp: this.cmp,
                path: this.getPath()
            }
            this.$emit('openEditor', payload)
        },
        openEditor(key, idx) {
            let el = (idx !== undefined) ? this.cmp.info[key][idx] : this.cmp.info[key]
            el = utilService.copy(el)
            const payload = {
                key,
                path: this.getPath(),
                el,
                currCmp: this.cmp,
                elIdx: idx
            }
            this.$emit('openEditor', payload)
        },
        updateCmp(ev, key) {
            const path = this.getPath()
            let cmp = utilService.copy(this.cmp)
            cmp.info[key].txt = ev.target.innerText

            try {
                this.$store.dispatch({ type: 'updateWap', cmp, path })
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
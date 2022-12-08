<template>

    <section class="main-layout full wap-hero-wrapper" @click.stop="openSectionEditor" :style="cmp.style" @mousedown="$emit('acceptDrop')"   :class="[...cmp.classes, selected]">

        <section class="wap-hero " :style="getCmpStyle" :class="cmp.classes">

            <h1 contenteditable="true" @click.stop @mousedown.stop="openEditor('heading')" v-if="cmp.info.heading" :style="cmp.info.heading.style"
                @blur="updateCmp($event, 'heading')">
                {{ cmp.info.heading.txt }}
            </h1>
            <p contenteditable="true" v-if="cmp.info.subHeading" @click.stop @mousedown.stop="openEditor('subHeading')" :style="cmp.info.subHeading?.style"
                @blur="updateCmp($event, 'subHeading')">{{
                        (cmp.info.subHeading?.txt)
                }}</p>

            <button contenteditable="true" v-if="cmp.info.btns" v-for="(btn, idx) in cmp.info.btns" @click.stop @mousedown.stop="openEditor('btns', idx)"
                :style="btn.style">
                {{ btn.txt }}
            </button>


            <img v-for="(img, idx) in cmp.info.imgs" :src="img.src" alt="" class="wap-img" :class="img?.classes" @dragstart.prevent
                :style="img.style" @click.stop @mousedown.stop="openEditor('imgs', idx)" />
                
                
            </section>
        </section>

</template>
<script>
import { utilService } from '../../services/util.service';

export default {
    name: 'dynamic-hero-cmp',
    props: { cmp: Object, isSelected: Boolean },
    components: {},
    data() {
        return {
        }
    },
    created() { 
    },
    methods: {
        unselect() {
        },
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

            if(cmp.info[key].txt === ev.target.innerText) return


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
            return { fatherIdx: cmpIdx, idx, id: this.cmp.id }
        }
    },
    computed: {
        selected() {
            return this.isSelected ? 'selected1' : ''
        },
        getCmpStyle() {
            const style = utilService.copy(this.cmp.style)
            delete style['background-image']
            return style
        }
    },
    unmounted() { },
};
</script>
<style>

</style>
<template>
    <section class="main-layout full wap-form-warper" :style="cmp.style" :class="[...cmp.classes, selected]"
        @click.stop="openSectionEditor" @mousedown="$emit('acceptDrop')">

        <section class="wap-form">
            <h1 v-if="cmp.info.heading?.txt" contenteditable="true" :style="cmp.info.heading.style" @click.stop
                @mousedown.stop="openEditor('heading')" @blur="updateCmp($event, 'heading')">{{ cmp.info.heading.txt }}
            </h1>

            <p contenteditable="true" v-if="cmp.info.subHeading?.txt" @click.stop
                @mousedown.stop="openEditor('subHeading')" :style="cmp.info.subHeading?.style"
                @blur="updateCmp($event, 'subHeading')">
                {{
                        (cmp.info.subHeading?.txt)
                }}</p>

            <form action="" v-if="cmp.info.inputs" @submit.prevent>
                <div v-for="input in cmp.info.inputs">
                    <label>
                        <span v-if="input.label">{{ input.label }}</span>
                        <input v-if="input.inpType === 'input'" :type="input.inpContentType"
                            :placeholder="input.placeholder" :required="input.isRequired">

                        <textarea v-if="input.inpType === 'textarea'" :type="input.inpContentType">
                </textarea>
                    </label>

                </div>
                <button v-for="(btn, idx) in cmp.info.btns" contenteditable="true" @click.stop
                    @mousedown.stop="openEditor('btns', idx)" :style="btn.style"
                    @blur="updateCmp($event, 'btns', idx)">{{
        btn.txt
                    }}</button>
            </form>

            <!-- <pre>{{ cmp.info.inputs }}</pre> -->
        </section>
    </section>

</template>
<script>
import { utilService } from '../../services/util.service';

export default {
    name: 'dynamic-form-cmp',
    props: { cmp: Object },
    components: {},
    data() {
        return {};
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
                path: this.getPath(idx),
                el,
                currCmp: this.cmp,
                elIdx: idx
            }
            this.$emit('openEditor', payload)
        },
        updateCmp(ev, key, idx) {
            let wap = this.$store.getters.getWapToEdit
            wap = utilService.copy(wap)
            const path = this.getPath(idx)
            let cmp = utilService.copy(this.cmp)
            let el
            if (idx !== undefined) {
                el = cmp.info[key][idx]
            } else {
                el = cmp.info[key]
            }
            if (el.txt === ev.target.innerText) return
            el.txt = ev.target.innerText

            wap.cmps[path.fatherIdx] = cmp
            try {
                this.$store.dispatch({ type: 'updateWapFull', wap })
            } catch {
                console.log('ops')
            }
        },
        getPath(idx) {
            const wap = this.$store.getters.getWapToEdit
            const cmpIdx = wap.cmps.findIndex(cmp => cmp.id === this.cmp.id)
            return { fatherIdx: cmpIdx, elIdx: idx, id: this.cmp.id }
        },

    },
    computed: {
        selected() {
            return this.isSelected ? 'selected1' : ''
        }

    },
    unmounted() { },
};
</script>
<style>

</style>
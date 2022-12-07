<template>
    <section class="main-layout full wap-form-warper" :style="cmp.style" :class="[...cmp.classes, selected]"
        @click.stop="openSectionEditor" @mousedown="$emit('acceptDrop')">

        <section class="wap-form">
            <h1 v-if="cmp.info.heading.txt" :style="cmp.info.heading.style" @click.stop
                @mousedown.stop="openEditor('heading')">{{ cmp.info.heading.txt }}</h1>

            <p  contenteditable="true" v-if="cmp.info.subHeading" @click.stop @mousedown.stop="openEditor('subHeading')"
                :style="cmp.info.subHeading?.style"  @blur="updateCmp($event, 'subHeading')">
                {{
                        (cmp.info.subHeading?.txt)
                }}</p>

            <form action="" v-if="cmp.info.inputs" @submit.prevent>
                <div v-for="input in cmp.info.inputs">
                    <input v-if="input.inpType === 'input'" :type="input.inpContentType">

                    <textarea v-if="input.inpType === 'textarea'" :type="input.inpContentType">
                </textarea>
                </div>
                <div v-if="cmp.info.btns" v-for="(btn, idx) in cmp.info.btns">

                    <button>
                        {{ btn.txt }}
                    </button>
                </div>
            </form>
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

            if (cmp.info[key].txt === ev.target.innerText) return


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
            return this.isSelected ? 'selected' : ''
        }
    },
    unmounted() { },
};
</script>
<style>

</style>
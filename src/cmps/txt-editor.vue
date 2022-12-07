<template>

    <section class="flex column txt-cmps-editor">
        <h2>Edit</h2>

        <section class="section-cmp-editor undo">
            <button class="material-symbols-outlined" :disabled="!getHistory.currState" @click="goBack" v-tooltip="'Undo'">
                undo
            </button>
            <button class="material-symbols-outlined" :disabled="(getHistory.currState === getHistory.waps.length - 1)"
                @click="goForwards" v-tooltip="'Redo'">
                redo
            </button>
        </section>
        <hr/>

        <section class="color-picker-wrapper">
            <span>Text Color:</span>
            <color-picker @setColor="updateClr" />
            <span v-if="info.key === 'btns'">Background Color:</span>
            <color-picker @setColor="updateBgClr" v-if="info.key === 'btns'" />
        </section>
        <hr>


        <section class="text-format">

            <span>Font Size: </span>
            <slider :change="info" @changed="updateFS" />

            <section class="editor-checkbox flex">
                <label class="flex align-center">
                    <input type="checkbox" :checked="info.el.style['font-weight'] === 'bold'" @change="updateWeight">
                    <span class="material-symbols-outlined">
                        format_bold
                    </span>
                </label>
                <label class="flex">
                    <input type="checkbox" :checked="info.el.style['font-style'] === 'italic'" @change="updateStyle">
                    <span class="material-symbols-outlined">
                        format_italic
                    </span>
                </label>
                <label class="flex">
                    <input type="checkbox" :checked="info.el.style['text-decoration'] === 'underline'"
                        @change="updateUnderline">
                    <span class="material-symbols-outlined">
                        format_underlined
                    </span>
                </label>
            </section>
            <label for="font" class="flex align-center gap font-picker-wrapper">
                <span>Choose Font:</span>
                <font-picker @setFont="updateFont" />
            </label>
            <label v-if="info.key === 'btns'" class="border-radius-bar">
                <span>Border-radius</span>
                <slider :change="info" @changed="updateRadius" />
            </label>
        </section>
        <hr>


        
    </section>

</template>
<script>
import { xor } from 'lodash';
import { utilService } from '../services/util.service';
import colorPicker from './util/color-picker.vue';
import fontPicker from './util/font-picker.vue';
import slider from './util/slider.vue'


export default {
    name: 'text-editor',
    props: {
        info: Object
    },
    components: {
        colorPicker,
        fontPicker,
        slider
    },
    data() {
        return {
            style: {

            }
        };
    },
    created() {
        this.updateCmp = utilService.debounce(this.updateCmp, 300)
    },
    methods: {
        updateClr(ev) {
            this.updateCmp('color', ev.target?.value || ev)
        },
        updateBgClr(ev) {
            this.updateCmp('background-color', ev.target?.value || ev)
        },
        updateFS(val) {
            this.updateCmp('font-size', val + 'px')
        },
        updateWeight(ev) {
            this.updateCmp('font-weight', ev.target.checked ? 'bold' : '')
        },
        updateStyle(ev) {
            this.updateCmp('font-style', ev.target.checked ? 'italic' : '')
        },
        updateUnderline(ev) {
            this.updateCmp('text-decoration', ev.target.checked ? 'underline' : '')
        },
        updateFont(val) {
            this.updateCmp('font-family', val)
        },
        updateRadius(val) {
            this.updateCmp('border-radius', val + '%')
        },
        updateCmp(att, val) {
            const { key, path, elIdx } = this.info
            const cmp = this.getCurrCmp(path)
            const copyCmp = utilService.copy(cmp)
            let elCopy

            if (elIdx !== undefined) {
                elCopy = copyCmp.info[key][elIdx]
            } else {
                elCopy = copyCmp.info[key]
            }
            elCopy.style[att] = val
            console.log(elCopy);
            console.log(path);
            // CMP UPDATE
            if (elIdx !== undefined) {
                copyCmp.info[key][elIdx] = elCopy
            } else {
                copyCmp.info[key] = elCopy
            }

            try {
                this.$store.dispatch({ type: 'updateWap', cmp: copyCmp, path })
            } catch {
                console.log('ops')
            }
        },
        goBack() {
            // TODO: IM FOR REDO UNDO

            this.$store.dispatch({ type: 'goBack' })
        },
        goForwards() {
            // TODO: IM FOR REDO UNDO

            this.$store.dispatch({ type: 'goForwards' })
        },
        getCurrCmp(path) {
            const wap = this.$store.getters.getLastState
            const cmpIdx = wap.cmps.findIndex(cmp => cmp.id === path.id)
            if (path.idx !== undefined) {
                return wap.cmps[cmpIdx].cmps[path.idx]
            } else {
                return wap.cmps[cmpIdx]
            }
        }

    },
    computed: {
        borderRadius() {
            const { key } = this.info
            return this.cmp.info[key].style['border-radius'] ? +this.cmp.info[key].style['border-radius'].slice(0, -1) : 0
        },

        getHistory() {
            // TODO: IM FOR REDO UNDO
            return this.$store.getters.getHistory
        }
    },
    unmounted() { },
    watch: {
        info: function () {
        }

    }
};
</script>

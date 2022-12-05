<template>

    <section class="flex column txt-cmps-editor">
        <h2>Edit</h2>
        <span>Text Color:</span>
        <color-picker @setColor="updateClr" />
        <span v-if="info.key === 'btns'">Background Color:</span>
        <color-picker @setColor="updateBgClr" v-if="info.key === 'btns'" />
        <hr>

        <!-- <label>
            <input type="color" :value="info.style.color || '#333333'" @input="updateClr">
        </label>
        <label>
            <span>background color</span>
            <input type="color" :value="info.style['background-color'] || '#333333'" @input="updateBgClr">
        </label> -->

        <section class="text-format">

            <label class="flex align-center gap">
                <span>Font Size: </span>
                <input type="range" min="10" max="100" @input="updateFS">
            </label>

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
            <label v-if="info.key === 'btns'">
                <span>Border-radius</span>
                <input type="range" min="0" max="100" @input="updateRadius">
            </label>
            <hr>
        </section>

        <section>
            <button :disabled="!getHistory.currState" @click="goBack">Last Puk</button>
            <button :disabled="(getHistory.currState === getHistory.waps.length -1)" @click="goForwards">Next Puk</button>
        </section>
    </section>

</template>
<script>
import { xor } from 'lodash';
import { utilService } from '../services/util.service';
import colorPicker from './util/color-picker.vue';
import fontPicker from './util/font-picker.vue';



export default {
    name: 'text-editor',
    props: {
        info: Object
    },
    components: {
        colorPicker,
        fontPicker
    },
    data() {
        return {
            style: {

            }
        };
    },
    created() {
    },
    methods: {
        updateClr(ev) {
            this.updateCmp('color', ev.target?.value || ev)
        },
        updateBgClr(ev) {
            this.updateCmp('background-color', ev.target?.value || ev)
        },
        updateFS(ev) {
            this.updateCmp('font-size', ev.target.value + 'px')
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
        updateRadius(ev) {
            this.updateCmp('border-radius', ev.target.value + '%')
        },
        updateCmp(att, value) {
            const { key, path, currCmp, elIdx } = this.info

            const copyCmp = utilService.copy(currCmp)
            let elCopy

            if (elIdx !== undefined) {
                elCopy = copyCmp.info[key][elIdx]
            } else {
                elCopy = copyCmp.info[key]
            }
            elCopy.style[att] = value
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
            this.$store.dispatch({ type: 'goBack' })
        },
        goForwards() {
            this.$store.dispatch({ type: 'goForwards' })
        }

    },
    computed: {
        rangeValue() {
            const { key, isContainer, idx } = this.info
            if (!isContainer) {
                return this.cmp.info[key].style['font-size'] ? +this.cmp.info[key].style['font-size'].slice(0, -2) : 0
            } else {

            }
        },
        borderRadius() {

            const { key } = this.info
            return this.cmp.info[key].style['border-radius'] ? +this.cmp.info[key].style['border-radius'].slice(0, -1) : 0
        },

        getHistory() {
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

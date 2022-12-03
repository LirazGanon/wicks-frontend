<template>

    <section class="flex column txt-cmps-editor">
        <h2>Edit</h2>
        <span>Color</span>
        <color-picker @setColor="updateClr" />
        <span>Backround Color</span>
        <color-picker @setColor="updateBgClr" />



        <!-- <label>
            <input type="color" :value="info.style.color || '#333333'" @input="updateClr">
        </label>
        <label>
            <span>background color</span>
            <input type="color" :value="info.style['background-color'] || '#333333'" @input="updateBgClr">
        </label> -->


        <label>
            <span>Font Size </span>
            <input type="number" min="10" max="100" @input="updateFS">
        </label>
        <label class="flex">
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
        <label for="font">Choose Font:
            <select name="font" @change="updateFont" :selected="info.el.style['font-family']">
                <option value="">default</option>
                <option value="puki">puki</option>
                <option value="muki">muki</option>
                <option value="shuki">shuki</option>
                <option value="kuki">kuki</option>
            </select>
        </label>

        <label v-if="info.key === 'btns'">
            <span>Border-radius</span>
            <input type="range" min="0" max="100" @input="updateRadius">
        </label>



    </section>

</template>
<script>
import { xor } from 'lodash';
import { utilService } from '../services/util.service';
import colorPicker from './util/color-picker.vue';


export default {
    name: 'text-editor',
    props: {
        info: Object
    },
    components: {
        colorPicker
    },
    data() {
        return {

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
        updateFont(ev) {
            console.log(ev.target.value);
            // this.updateCmp('font-family', ev.target.value)
        },
        updateRadius(ev) {
            this.updateCmp('border-radius', ev.target.value + '%')
        },

        updateCmp(att, value) {
            const { key, path, el, currCmp, elIdx } = this.info
            const originalWap = this.$store.getters.getWapToEdit

            const elCopy = utilService.copy(el)
            const copyCmp = utilService.copy(currCmp)
            const wap = utilService.copy(originalWap)

            elCopy.style[att] = value
            console.log(elCopy);
            if (elIdx !== undefined) {
                copyCmp.info[key][elIdx] = elCopy
            } else {
                copyCmp.info[key] = elCopy
            }

            if (path.idx !== undefined) {
                wap.cmps[path.fatherIdx].cmps[path.idx] = copyCmp
            } else {
                wap.cmps[path.fatherIdx] = copyCmp
            }

            try {
                this.$store.dispatch({ type: 'updateWap', wap })
            } catch {
                console.log('ops')
            }
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
            // if (fatherEl) {
            //     if (isContainer) {
            //         const innerIdx = this.cmp.info.cmps.findIndex(cmp => cmp.type === fatherEl)
            //         // console.log('puk:', this.cmp.info.cmps[innerIdx].info[key])
            //         this.cmp.info.cmps[innerIdx].info[key].style[att] = value
            //         // console.log('----', this.cmp.info.cmps[innerIdx].info[key]);
            //     } else if (idx !== undefined) {

            //         this.cmp.info[fatherEl].info[key][idx].style[att] = value
            //     } else {

            //         this.cmp.info[fatherEl].info[key].style[att] = value
            //     }

            // }
            // else {
            //     this.cmp.info[key].style[att] = value
            // }
            const { key } = this.info
            return this.cmp.info[key].style['border-radius'] ? +this.cmp.info[key].style['border-radius'].slice(0, -1) : 0
        }

    },
    unmounted() { },
    watch: {
        info: function () {
            console.log(this.info)
        }

    }
};
</script>

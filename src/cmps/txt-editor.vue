<template>

    <section class="flex column" v-if="cmp">


        <label>
            <span>color</span>
            <input type="color" :value="info.style.color || '#333333'" @input="updateClr">
        </label>
        <label>
            <span>background color</span>
            <input type="color" :value="info.style['background-color'] || '#333333'" @input="updateBgClr">
        </label>
        <label>
            <span>Font Size</span>
            <input type="number" min="10" max="100" :value="rangeValue" @input="updateFS">
        </label>
        <label>
            <span class="material-symbols-outlined">
                format_bold
            </span>
            <input type="checkbox" :checked="info.style['font-weight'] === 'bold'" @change="updateWeight">
        </label>
        <label>
            <span class="material-symbols-outlined">
                format_italic
            </span>
            <input type="checkbox" :checked="info.style['font-style'] === 'italic'" @change="updateStyle">
        </label>
        <label for="font">Choose Font:</label>
        <select name="font" @change="updateFont" :selected="info.style['font-family']">
            <option value="">default</option>
            <option value="puki">puki</option>
            <option value="muki">muki</option>
            <option value="shuki">shuki</option>
            <option value="kuki">kuki</option>
        </select>

        <label>
            <span>Border-radius</span>
            <input type="range" min="0" max="100" :value="borderRadius" @input="updateRadius">
        </label>

    </section>

</template>
<script>
export default {
    name: 'text-editor',
    props: { info: Object },
    components: {},
    data() {
        return {
            cmp: null
        };
    },
    created() {
        const wap = this.$store.getters.getWapToEdit
        const cmp = wap.cmps.find(cmp => cmp.id === this.info.id)
        this.cmp = JSON.parse(JSON.stringify(cmp))
    },

    methods: {
        updateClr(ev) {
            this.updateCmp('color', ev.target.value)
        },
        updateBgClr(ev) {
            this.updateCmp('background-color', ev.target.value)
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
            let wap = this.$store.getters.getWapToEdit
            const idx = wap.cmps.findIndex(cmp => cmp.id === this.info.id)
            this.cmp.info[this.info.key].style[att] = value
            wap = JSON.parse(JSON.stringify(wap))
            wap.cmps[idx] = JSON.parse(JSON.stringify(this.cmp))
            try {
                this.$store.dispatch({ type: 'updateWap', wap })
            } catch {
                console.log('ops')
            }
        },

    },
    computed: {
        rangeValue() {
            return this.info.style['font-size'] ? +this.info.style['font-size'].slice(0, -2) : 16
        },
        borderRadius(){
            return this.info.style['border-radius'] ? + this.info.style['border-radius'].slice(0,-1) : 0
        }

    },
    unmounted() { },
};
</script>
<style>

</style>
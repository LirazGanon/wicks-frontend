<template>

    <section class="flex column txt-cmps-editor" v-if="cmp">
        <h2>Edit</h2>
        <span>Color</span>
        <div @mousemove="onMousemove" @click="updateCmp('color', `hsl(${x}, 80%, 50%)`)"
            :style="{ backgroundColor: `hsl(${x}, 80%, 50%)` }" class="movearea">
            <p>Click on the desire color...</p>
        </div>

        <span>Backround Color</span>
        <div @mousemove="onMousemovey" @click="updateCmp('background-color', `hsl(${y}, 80%, 50%)`)"
            :style="{ backgroundColor: `hsl(${y}, 80%, 50%)` }" class="movearea">
            <p>Click on the desire color...</p>
        </div>


        <!-- <label>
            <input type="color" :value="info.style.color || '#333333'" @input="updateClr">
        </label>
        <label>
            <span>background color</span>
            <input type="color" :value="info.style['background-color'] || '#333333'" @input="updateBgClr">
        </label> -->
        <label>
            <span>Font Size </span>
            <input type="number" min="10" max="100" :value="rangeValue" @input="updateFS">
        </label>
        <label class="flex">
            <input type="checkbox" :checked="info.style['font-weight'] === 'bold'" @change="updateWeight">
            <span class="material-symbols-outlined">
                format_bold
            </span>
        </label>
        <label class="flex">
            <input type="checkbox" :checked="info.style['font-style'] === 'italic'" @change="updateStyle">
            <span class="material-symbols-outlined">
                format_italic
            </span>
        </label>
        <label for="font">Choose Font:
            <select name="font" @change="updateFont" :selected="info?.style['font-family']">
                <option value="">default</option>
                <option value="puki">puki</option>
                <option value="muki">muki</option>
                <option value="shuki">shuki</option>
                <option value="kuki">kuki</option>
            </select>
        </label>

        <label>
            <span>Border-radius</span>
            <input type="range" min="0" max="100" :value="borderRadius" @input="updateRadius">
        </label>


        <pre>{{ this.info }}</pre>
        <!-- <pre>{{ this.cmp }}</pre> -->
    </section>

</template>
<script>
export default {
    name: 'text-editor',
    props: {
        info: Object,
        cmp: Object
    },
    components: {},
    data() {
        return {
            x: 0,
            y: 0,
        };
    },
    created() {
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
        onMousemove(e) {
            this.x = e.clientX
        },
        onMousemovey(e) {
            this.y = e.clientX
        },
        updateCmp(att, value) {
            let wap = this.$store.getters.getWapToEdit
            const cmpIdx = wap.cmps.findIndex(cmp => cmp.id === this.info.id)
            const { key, fatherEl, idx,isContainer } = this.info
            if (fatherEl) {
                if (idx !== undefined) {
                    this.cmp.info[fatherEl].info[key][idx].style[att] = value

                } else if (isContainer) {
                    console.log('puki');
                } else {

                    this.cmp.info[fatherEl].info[key].style[att] = value
                }
            }
            else {
                this.cmp.info[key].style[att] = value
            }
            wap = JSON.parse(JSON.stringify(wap))
            wap.cmps[cmpIdx] = JSON.parse(JSON.stringify(this.cmp))
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
        borderRadius() {
            return this.info.style['border-radius'] ? + this.info.style['border-radius'].slice(0, -1) : 0
        }

    },
    unmounted() { },
};
</script>
<style>

</style>
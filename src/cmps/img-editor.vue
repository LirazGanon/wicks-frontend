<template>
    <section class="img-cmp-editor flex column" v-if="info">
        <h2>Edit</h2>
        <img :src="info.el.src">
        <label>
            <span>src </span>
            <input type="text" :value="info.el.src" @input="updateSrc">
        </label>
        <img-uploader @uploaded="changeImg" />
        <label v-if="info.currCmp.type !== 'wap-bg-img'">
            <span>Border-radius </span>
            <input type="range" min="0" max="50" :value="rangeValue" @input="updateRadius">
        </label>
    </section>
</template>
<script>
import { utilService } from '../services/util.service';
import imgUploader from './img-uploader.vue';
export default {
    name: 'img-editor',
    props: {
        info: Object
    },
    components: { imgUploader },
    data() {
        return {
            el: null
        };
    },
    created() {
        this.updateCmp = utilService.debounce(this.updateCmp, 300)
        this.el = utilService.copy(this.info.el)
    },
    methods: {
        changeImg(imgUrl) {
            const { key, path, el, currCmp, elIdx } = this.info
            const copyCmp = utilService.copy(currCmp)

            el.src = imgUrl

            // CMP UPDATE
            if (elIdx !== undefined) {
                copyCmp.info[key][elIdx] = el
            } else {
                copyCmp.info[key] = el
            }
            try {
                this.$store.dispatch({ type: 'updateWap', cmp: copyCmp, path })
            } catch {
                console.log('could not updat image')
            }
        },

        updateSrc(ev) {
            this.updateCmp('src', ev.target.value)
            this.info.el.src = ev.target.value
        },
        updateRadius(ev) {
            this.updateCmp('border-radius', ev.target.value + '%')
        },
        updateCmp(att, value) {
            const { key, path, el, currCmp, elIdx } = this.info
            
            console.log(el);
            this.el.style[att] = value
            const copyCmp = utilService.copy(currCmp)
            const elCopy = utilService.copy(el)

            if (att === 'src') {
                elCopy.src = value
            } else {
                elCopy.style[att] = value
            }
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
    },
    computed: {
        rangeValue() {
            return this.info.el.style['border-radius'] ? +this.info.el.style['border-radius'].slice(0, -1) : 0
        }
    },
    unmounted() { },
    watch: {
        info: function () {
            this.el = utilService.copy(this.info.el)
            console.log('hi');
        }
    }

};
</script>
<style>

</style>
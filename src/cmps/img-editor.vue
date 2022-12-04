<template>
    <section class="img-cmp-editor flex column">
        <h2>Edit</h2>
        <img :src="info.el.src" :style="info.el.style">
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

        };
    },
    created() {
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
            this.info.el.style['border-radius'] = ev.target.value + '%'
        },
        updateCmp(att, value) {
            const { key, path, el, currCmp, elIdx } = this.info

            const copyCmp = utilService.copy(currCmp)

            if (att === 'src') {
                el.src = value
            } else {
                el.style[att] = value
            }
            if (elIdx !== undefined) {
                copyCmp.info[key][elIdx] = el
            } else {
                copyCmp.info[key] = el
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
    info: function () {
        console.log(this.info);
    }

};
</script>
<style>

</style>
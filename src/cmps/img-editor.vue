<template>
    <section class="img-cmp-editor flex column">
        <h2>Edit Image</h2>
        <section class="section-cmp-editor undo">
            <button class="material-symbols-outlined" :disabled="!getHistory.currState" @click="goBack" v-tooltip="'Undo'">
                undo
            </button>
            <button class="material-symbols-outlined" :disabled="(getHistory.currState === getHistory.waps.length - 1)"
                @click="goForwards" v-tooltip="'Redo'">
                redo
            </button>
        </section>
        <hr>

        <section class="img-replace flex column">
            <img :src="getSrc.src" >
            <!-- <section class="img-replace-src">
                <label>
                    <span>Insert an image src: </span>
                    <input type="text" :value="getSrc?.src" @input="updateSrc">
                </label>
                <p> </p>
            </section> -->
            <hr>
                <img-uploader @uploaded="changeImg" />
            </section>
            <hr>
        <label v-if="info.currCmp.type !== 'wap-bg-img'">
            <span>Border radius: </span>
            <slider :change="info" @changed="updateRadius" />
        </label>
    </section>
   
    <!-- <pre>{{getSrc}}</pre> -->
</template>
<script>
import { utilService } from '../services/util.service';
import imgUploader from './img-uploader.vue';
import slider from './util/slider.vue'

export default {
    name: 'img-editor',
    props: {
        info: Object
    },
    components: { imgUploader, slider },
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
            // const { key, path, el, currCmp, elIdx } = this.info
            // const copyCmp = utilService.copy(currCmp)



            const { key, path, elIdx } = this.info
            const cmp = this.getCurrCmp(path)
            const copyCmp = utilService.copy(cmp)
            let elCopy

            if (elIdx !== undefined) {
                elCopy = copyCmp.info[key][elIdx]
            } else {
                elCopy = copyCmp.info[key]
            }

            elCopy.src = imgUrl


            // CMP UPDATE
            if (elIdx !== undefined) {
                copyCmp.info[key][elIdx] = elCopy
            } else {
                copyCmp.info[key] = elCopy
            }




            try {
                this.$store.dispatch({ type: 'updateWap', cmp: copyCmp, path })
            } catch {
                console.log('could not updat image')
            }
        },

        updateSrc(ev) {
            this.updateCmp('src', ev.target.value)
        },
        updateRadius(value) {
            this.updateCmp('border-radius', value + '%')
        },
        updateCmp(att, value) {

            const { key, path, elIdx } = this.info
            const cmp = this.getCurrCmp(path)
            const copyCmp = utilService.copy(cmp)
            let elCopy

            if (elIdx !== undefined) {
                elCopy = copyCmp.info[key][elIdx]
            } else {
                elCopy = copyCmp.info[key]
            }
            // CMP UPDATE
            if (att === 'src') {
                elCopy.src = value
            } else {
                elCopy.style[att] = value
            }





            try {
                this.$store.dispatch({ type: 'updateWap', cmp: copyCmp, path })
            } catch {
                console.log('ops')
            }
        },
        getCurrCmp(path) {
            const wap = this.$store.getters.getLastState
            const cmpIdx = wap.cmps.findIndex(cmp => cmp.id === path.id)
  
            if (path.idx !== undefined) {
                return wap.cmps[cmpIdx].cmps[path.idx]
            } else {
                return wap.cmps[cmpIdx]
            }
        },
        goBack() {
            this.$store.dispatch({ type: 'goBack' })
        },
        goForwards() {
            this.$store.dispatch({ type: 'goForwards' })
        },
    },
    computed: {
        rangeValue() {
            return this.info.el.style['border-radius'] ? +this.info.el.style['border-radius'].slice(0, -1) : 0
        },
        getSrc() {
            const { key, path, elIdx } = this.info
            const cmp = this.getCurrCmp(path)
            const copyCmp = utilService.copy(cmp)
            let elCopy
            if (elIdx !== undefined) {
                elCopy = copyCmp.info[key][elIdx]
            } else {
                elCopy = copyCmp.info[key]
            }
            return elCopy

        },
        getHistory() {
            // TODO: IM FOR REDO UNDO
            return this.$store.getters.getHistory
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
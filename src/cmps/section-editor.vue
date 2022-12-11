<template>


    <section class="section-cmp-editor flex column">
        <h2>Section Edit</h2>
        <section class="delete-duplicate" v-if="cmpsLength">
            <button class="material-symbols-outlined" :disabled="!getHistory.currState" @click="goBack"
                v-tooltip="'Undo'">
                undo
            </button>
            <button class="material-symbols-outlined" :disabled="(getHistory.currState === getHistory.waps.length - 1)"
                @click="goForwards" v-tooltip="'Redo'">
                redo
            </button>
            <button v-tooltip="'Delete Section'" class="material-symbols-outlined" @click="removeCmp">delete</button>
            <button v-tooltip="'Copy Section'" class="material-symbols-outlined"
                @click="duplicateCmp">content_copy</button>




            <hr>
            <section class="edit-options-wrapper">
                
                <section class="color-picker-wrapper">
                    <span class="background-color">Background Color</span>
                    <color-picker @setColor="updateBgClr" />
                </section>
                
                <img-uploader  @uploaded="changeSrc" />
                <!-- <img-uploader v-if="cmp.style['background-image']" @uploaded="changeSrc" /> -->
            </section>
            <hr>
        </section>
            <section v-else>
                Please select a section
            </section>
            
            
            
    </section>
</template>
<script>
import { eventBus } from '../services/event-bus.service';
import { utilService } from '../services/util.service';
import imgUploader from './img-uploader.vue';
import colorPicker from './util/color-picker.vue';

export default {
    name: 'variable',
    props: { info: Object },
    components: { colorPicker, imgUploader },
    data() {
        return {
            style: {},
            cmp: null,
            path: null
        };
    },
    created() {
        this.setInfo()
    },
    methods: {
        setInfo() {
            this.cmp = utilService.copy(this.info.currCmp)
            this.path = this.info.path
        },
        updateBgClr(clr) {
            this.style = { 'background-color': clr }
            this.updateCmp()
        },
        changeSrc(src) {
            // console.log(src);
            this.style = { 'background-image': `url(${src})` }
            this.updateCmp()

        }
        ,
        updateCmp() {
            const path = this.path
            const cmp = utilService.copy(this.cmp)
            path.fatherIdx = this.getCurrCmpIdx()

            const wap = this.$store.getters.getLastState
            cmp.style = this.style

            try {
                this.$store.dispatch({ type: 'updateWap', cmp, path })
            } catch {
                console.log('ops')
            }
        },

        async removeCmp() {
            const path = this.path
            const currCmp = utilService.copy(this.cmp)
            path.fatherIdx = this.getCurrCmpIdx()

            try {
                const wap = await this.$store.dispatch({ type: 'removeCmp', cmp: currCmp, path })
                if (!wap.cmps.length) return
                if (path.fatherIdx <= wap.cmps.length - 1) {
                    // console.log(path);
                    this.cmp = wap.cmps[path.fatherIdx]
                }
                else {
                    this.cmp = wap.cmps[path.fatherIdx - 1]
                    this.path.fatherIdx = path.fatherIdx - 1
                }
                this.path = path
                const idx = this.path.fatherIdx
                this.cmp = wap.cmps[idx]
                this.path.id = wap.cmps[idx].id
                eventBus.emit('reselect', wap.cmps[idx].id)

            } catch (err) {
                console.log('ops', err)
            }
        },

        duplicateCmp() {
            const path = this.path
            const cmp = utilService.copy(this.cmp)
            path.fatherIdx = this.getCurrCmpIdx()

            cmp.id = utilService.makeId()
            if (this.style['background-color']) {
                cmp.style = this.style
            }
            try {
                this.$store.dispatch({ type: 'duplicateCmp', cmp, path })
            } catch {
                console.log('ops')
            }

        },
        getCurrCmpIdx() {
            const wap = this.$store.getters.getWapToEdit
            return wap.cmps.findIndex(cmp => cmp.id === this.cmp.id)
        },
        goBack() {
            this.$store.dispatch({ type: 'goBack' })
        },
        goForwards() {
            this.$store.dispatch({ type: 'goForwards' })
        },
    },
    computed: {
        cmpsLength() {
            const wap = this.$store.getters.getWapToEdit
            return wap.cmps.length
        },
        getHistory() {
            // TODO: IM FOR REDO UNDO
            return this.$store.getters.getHistory
        }
    },
    unmounted() { },
    watch: {
        info: function () {
            this.setInfo()
        }
    }

};
</script>
<style>

</style>
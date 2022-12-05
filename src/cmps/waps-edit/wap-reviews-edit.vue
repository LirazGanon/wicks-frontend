<template>
    <section class="wap-reviews" @click="openSectionEditor" :style="cmp.style">
        <h4 contenteditable="true" @click.stop="openEditor('heading')" @blur="updateCmp($event, 'heading')"
            :style="cmp.info.heading.style">{{ cmp.info.heading.txt }}</h4>
        <section class="reviews-container">
            <div v-for=" ( review, idx) in cmp.info.reviews" @click.stop="openEditor('reviews', idx)"
                :style="review.style">
                <p contenteditable="true" @blur="updateCmp($event, 'reviews', idx)">{{ review.txt }}</p>
                <p contenteditable="true" @blur="updateCmp($event, 'reviews', idx, 'author')">{{ review.author }}</p>
            </div>
        </section>
    </section>

</template>
<script>
import { utilService } from '../../services/util.service';

export default {

    name: 'dynamic-review-cmp',
    props: { cmp: Object },
    components: {},
    data() {
        return {};
    },
    created() { 
    },
    methods: {
        openSectionEditor() {

            const wapContent = {
                el: { type: 'section' },
                currCmp: this.cmp,
                path: this.getPath()
            }
            this.$emit('openEditor', wapContent)
        },
        openEditor(key, idx) {
            let el = (idx !== undefined) ? this.cmp.info[key][idx] : this.cmp.info[key]
            el = utilService.copy(el)
            const wapContent = {
                key,
                path: this.getPath(),
                el,
                currCmp: this.cmp,
                elIdx: idx
            }
            this.$emit('openEditor', wapContent)
        },
        getPath(idx) {
            const wap = this.$store.getters.getWapToEdit
            const cmpIdx = wap.cmps.findIndex(cmp => cmp.id === this.cmp.id)
            return { fatherIdx: cmpIdx, idx }
        },
        updateCmp(ev, key, idx, author) {
            const path = this.getPath()
            const cmp = utilService.copy(this.cmp)


            if (idx !== undefined) {
                if (author) {
                    cmp.info[key][idx][author] = ev.target.innerText
                } else {
                    cmp.info[key][idx].txt = ev.target.innerText
                }
            } else {
                cmp.info[key].txt = ev.target.innerText
            }

            try {
                this.$store.dispatch({ type: 'updateWap', cmp, path })
            } catch {
                console.log('ops')
            }
        }
    },
    computed: {},
    unmounted() { },
};
</script>
<style>

</style>
<template>
    <section class="wap-reviews">
        <h4 contenteditable="true" @click.stop="openEditor('heading')" @input="updateCmp($event, 'heading')"
            :style="cmp.info.heading.style">{{ cmp.info.heading.txt }}</h4>
        <section class="reviews-container">
            <div v-for=" ( review, idx) in cmp.info.reviews" @click.stop="openEditor('reviews', idx)" :style="review.style">
                <p contenteditable="true" @input="updateCmp($event, 'reviews', idx)">{{ review.txt }}</p>
                <p contenteditable="true" @input="updateCmp($event, 'reviews', idx, 'author')">{{ review.author }}</p>
            </div>
        </section>
    </section>

</template>
<script>
export default {
    name: 'dynamic-review-cmp',
    props: { cmp: Object },
    components: {},
    data() {
        return {};
    },
    created() { },
    methods: {
        openEditor(key, idx) {
            const el = (idx !== undefined) ? this.cmp.info[key][idx] : this.cmp.info[key]

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
        updateCmp(ev, key, innerIdx, author) {
            let wap = this.$store.getters.getWapToEdit
            const idx = wap.cmps.findIndex(cmp => cmp.id === this.cmp.id)
            let cmpCopy = JSON.parse(JSON.stringify(this.cmp))
            console.log(cmpCopy);

            if (innerIdx !== undefined) {
                if (author) {

                    cmpCopy.info[key][innerIdx][author] = ev.target.innerText
                } else {

                    cmpCopy.info[key][innerIdx].txt = ev.target.innerText
                }
            } else {
                cmpCopy.info[key].txt = ev.target.innerText
            }



            wap = JSON.parse(JSON.stringify(wap))
            wap.cmps[idx] = cmpCopy
            try {
                this.$store.dispatch({ type: 'updateWap', wap })
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
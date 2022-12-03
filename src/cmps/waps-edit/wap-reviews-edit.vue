<template>
    <section class="wap-reviews">
        <h4 contenteditable="true">{{ cmp.info.heading.txt }}</h4>
        <section class="reviews-container">
            <div v-for=" ( review, idx) in cmp.info.reviews" @click="openEditor('reviews', idx)" :style="review.style">
                <p contenteditable="true" >{{ review.txt }}</p>
                <p contenteditable="true">{{ review.author }}</p>
            </div>
        </section>
    </section>
    <!-- <pre>{{cmp}}</pre> -->

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
        }
    },
    computed: {},
    unmounted() { },
};
</script>
<style>

</style>
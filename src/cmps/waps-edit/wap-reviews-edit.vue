<template>
    <!-- <section class="wap-reviews">
        <h4 contenteditable="true">{{ cmp.info.heading.txt }}</h4>
        <section class="reviews-container">
            <div v-for="review in cmp.info.reviews">
                <p  contenteditable="true">{{ review.txt }}</p>
                <p  contenteditable="true">{{ review.author }}</p>
            </div>
        </section>
    </section> -->
    <pre>{{cmp}}</pre>

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
    methods: {},
    computed: {},
    unmounted() { },
};
</script>
<style>

</style>
<template>
    <section class="wap-form">
        <pre>{{ cmp.info }}</pre>

        <!-- <h4>form-{{ info.heading.txt }}</h4> -->
    </section>
    <form action="">
        <div v-for="input in cmp.info.inputs">
            <input v-if="input.inpType === 'input'" 
            :type="input.inpContentType">

            <textarea v-if="input.inpType === 'textarea'"
            :type="input.inpContentType">
        </textarea>
        </div>
    </form>

</template>
<script>
export default {
    name: 'dynamic-form-cmp',
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
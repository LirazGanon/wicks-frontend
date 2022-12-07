<template>
    <section class="wap-form">
        <pre>{{ cmp }}</pre>

        <form action="">
            <div v-for="input in cmp.info.inputs">
                <input contenteditable="true" v-if="input.inpType === 'input'" :type="input.inpContentType">

                <textarea contenteditable="true" v-if="input.inpType === 'textarea'" :type="input.inpContentType">
        </textarea>
            </div>
        </form>
    </section>

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
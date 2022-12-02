<template>
    <section class="wap-form">
        <!-- <pre>{{ cmp.info }}</pre> -->

        <!-- <h4>form-{{ info.heading.txt }}</h4> -->
    </section>
    <form action="">


        <div v-for="input in cmp.info.inputs">
            <label for="">{{input.label}}</label>
            <input v-if="input.inpType === 'input'" 
            :type="input.inpContentType"
            :placeholder="input.placeholder">

            <textarea v-if="input.inpType === 'textarea'"
            :type="input.inpContentType">
        </textarea>
        </div>
        <button v-for="btn in cmp.info.btns">{{btn.txt}}</button>
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
    created() { 
    
    },
    methods: {},
    computed: {},
    unmounted() { },
};
</script>
<style>

</style>
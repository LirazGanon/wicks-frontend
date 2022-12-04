<template>
    <section class="wap-form" :class="cmp.classes">
        <!-- <pre>{{ cmp.info }}</pre> -->

        <!-- <h4>form-{{ info.heading.txt }}</h4> -->
        
        <form >
    
    
            <div v-for="input in cmp.info.inputs">
                <label for="">{{input.label}}</label>
                <input v-if="input.inpType === 'input'" 
                :type="input.inpContentType"
                :placeholder="input.placeholder">
    
                <textarea v-if="input.inpType === 'textarea'"
                :type="input.inpContentType"
                :placeholder="input.placeholder">
            </textarea>
            </div>
            <button v-for="btn in cmp.info.btns" @click.prevent>{{btn.txt}}</button>
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
    created() { 
    
    },
    methods: {},
    computed: {},
    unmounted() { },
};
</script>
<style>

</style>
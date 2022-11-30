<template>
    <h2>wap-edit</h2>


    <section class="wap-editor flex">
        <editor :cmps="cmps" />
        <wap/>
    </section>


</template>
<script>
import wap from '../cmps/wap.vue'
import editor from '../cmps/editor.vue'

export default {
    name: 'wap-edit',
    props: {},
    components: {  editor, wap },
    data() {
        return {
            cmps: {
                type: [{
                    "id": "item-1",
                    "data": "HEADER"
                },
                {
                    "id": "item-2",
                    "data": "HERO"
                },
                {
                    "id": "item-3",
                    "data": "FORM"
                },
                {
                    "id": "item-4",
                    "data": "TEXT"
                },
                {
                    "id": "item-5",
                    "data": "FOOTER"
                }],
                options: {
                    "drop": false,
                    "animate": true
                }
            },
            wap: {
               
            }
        }
    },
    created() {
    },
    methods: {

    },
    computed: {
        wapToEdit() {
            return this.$store.getters.waps
        },

    },
    unmounted() { },
}
</script>
<style>

</style>
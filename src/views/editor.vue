<template>
    <main class="edit-container flex full column">

        <h2>wap-edit</h2>
        
        
        <section class="wap-editor flex">
            <editor-side :cmps="cmps" />
            <editor-wap/>
        </section>
        
    </main>
</template>

<script>
import editorWap from '../cmps/editor-wap.vue'
import editorSide from '../cmps/editor-side.vue'

export default {
    name: 'wap-edit',
    props: {},
    components: {  editorSide, editorWap },
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
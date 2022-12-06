<template>
    <main class="edit-container">
        <app-header />
        <editor-top />
        <section class="wap-editor flex">
            <!-- EDITOR TOP -->
            <editor-side :cmps="cmps" v-if="cmps" :editor="editor" />
            <editor-wap @openEditor="openEditor" />
        </section>


    </main>



</template>

<script>
import editorWap from '../cmps/editor-wap.vue'
import editorSide from '../cmps/editor-side.vue'
import editorTop from '../cmps/editor-top.vue'
import appHeader from '../cmps/app-header.vue'

export default {
    name: 'wap-edit',
    props: {},
    components: { editorSide, editorWap, editorTop, appHeader },
    data() {
        return {
            type: null,
            editor: null,
        }
    },

    methods: {

        openEditor(editorContent) {
            this.editor = editorContent
        },

    },
    computed: {

        cmps() {
            return this.$store.getters.cmps
        },


    },
    unmounted() { },
}
</script>
<style>

</style>
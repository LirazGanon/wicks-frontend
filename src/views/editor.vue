<template>
    <main class="edit-container flex full column">



        <section class="wap-editor flex">
            <!-- EDITOR TOP -->
            <editor-side :cmps="cmps" v-if="cmps" />
            <editor-wap />
        </section>

        <!-- <pre>
            {{cmps}}
        </pre> -->

    </main>



</template>

<script>
import editorWap from '../cmps/editor-wap.vue'
import editorSide from '../cmps/editor-side.vue'
import editorTop from '../cmps/editor-top.vue'


export default {
    name: 'wap-edit',
    props: {},
    components: { editorSide, editorWap,editorTop },
    data() {
        return {

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
        cmps() {
            return this.$store.getters.cmps
        }

    },
    unmounted() { },
}
</script>
<style>

</style>
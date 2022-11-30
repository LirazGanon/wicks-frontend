<template>
    <main class="edit-container flex full column">

        <h2>wap-edit</h2>


        <section class="wap-editor flex">
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

export default {
    name: 'wap-edit',
    props: {},
    components: { editorSide, editorWap },
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
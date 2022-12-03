<template>
    <section class="main-editor flex">

        <!-- LEFT NAV -->
        <section class="flex column left-nav">
            <button class="material-symbols-outlined" title="Add Section" @click="toggleActive('cmp')">
                add_circle
            </button>
            <button class="material-symbols-outlined" title="Pick Palette" @click="toggleActive('palette')">
                palette
            </button>
            <button class="material-symbols-outlined" title="Edit" @click="toggleActive('edit')">
                brush
            </button>
        </section>


        <!-- CMPS ADDITIONS -->
        <section v-if="active === 'cmp'" class="options flex">
            <ul>
                <li v-for="t in view.type" :key="t.id">
                    <button @click="type = t.data">{{ t.data }}</button>
                </li>
            </ul>
            <editor-cmp-prev :cmps="cmps" />
        </section>


        <!-- THEME PICKER -->
        <section v-if="active === 'palette'" class="flex options">

            <ul>
                <li v-for="p in 5">
                    <button>
                        חשוכי
                    </button>
                </li>
            </ul>
        </section>


        <!-- ACTUAL CMP EDITOR -->
        <section class="flex cmp-side-editor">
            <ul v-if="active === 'edit'">
                <component v-if="editor" :is="editor.el.type + 'Editor'" :info="editor" class="cmp-editor" />
            </ul>
        </section>
    </section>

</template>
<script>
import editorCmpPrev from './editor-cmp-prev.vue'


import txtEditor from './txt-editor.vue'
import imgEditor from './img-editor.vue'




export default {
    name: 'Editor',
    components: { editorCmpPrev, txtEditor, imgEditor },
    props: { editor: Object },
    data() {
        return {
            view: {},
            type: null,
            data: {},
            active: null
        };
    },
    created() {
        this.view = { ...this.cmps }
        console.log('this.editor:', this.editor)
        // this.type = this.cmps.type[0].data
        // this.setData()
    },
    methods: {
        setData() {
            const cmps = { ...this.view }

            cmps.type = cmps.type.map((x, i) => ({
                id: Date.now() / 15500 + i,
                data: this.type + ` ${i}`
            }))

            this.data = { ...cmps }
        },
        toggleActive(val) {
            if (!this.active || this.active !== val) this.active = val
            else this.active = null

        },

    },
    computed: {
        getEditor() {
            return this.editor
        },
        cmps() {
            return this.$store.getters.cmps
        },

    },
    watch: {
        editor: function () {
            this.active = 'edit'
            console.log(this.editor);
        }

    }
};
</script>
<style>

</style>
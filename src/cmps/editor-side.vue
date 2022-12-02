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
                <component :is="editor.type + 'Editor'" :info="editor" :cmp="getCmp" class="cmp-editor" />
            </ul>
        </section>
    </section>
    <pre>{{ editor }}</pre>

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
        getData() {
            return this.data
        },
        cmps() {
            return this.$store.getters.cmps
        },
        getCmp() {
            const wap = this.$store.getters.getWapToEdit
            const cmp = wap.cmps.find(cmp => {
                if (cmp.type === 'wap-container') {
                    return cmp.info.cmps.find(item => {
                        if (item.type === 'wap-gallery') {
                            return item.id === this.editor.id
                        }
                    });
                }
                return cmp.id === this.editor.id
            })
            // console.log('this.info:', this.info)
            // console.log('wap', wap);
            console.log('cmp', cmp);
            return JSON.parse(JSON.stringify(cmp))
        }
    },
    watch: {
        type() {
            this.setData()
        }
    }
};
</script>
<style>

</style>
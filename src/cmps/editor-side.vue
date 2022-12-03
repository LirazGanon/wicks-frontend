<template>
    <section class="main-editor flex">

        <!-- LEFT NAV -->
        <section class="left-nav flex column space-between">
            <section class="flex column">
                <button class="material-symbols-outlined" title="Add Section" :class="{ active: active === 'cmp' }"
                    @click="toggleActive('cmp')">
                    add_circle
                </button>
                <button class="material-symbols-outlined" title="Pick Palette" :class="{ active: active === 'palette' }"
                    @click="toggleActive('palette')">
                    palette
                </button>
                <button class="material-symbols-outlined" title="Edit" :class="{ active: active === 'edit' }"
                    @click="toggleActive('edit')">
                    brush
                </button>
            </section>
            <section class="bottom-button flex column">
                <button class="material-symbols-outlined" title="Edit" @click="placholder">
                    group_add
                </button>
                <button class="material-symbols-outlined" title="Edit" @click="placholder">
                    publish
                </button>
            </section>
        </section>


        <!-- CMPS ADDITIONS -->
        <section v-if="active === 'cmp'" class="options animate__animated animate__fadeInLeft">
            <h2>Add Section</h2>
            <!-- <ul>
                <li v-for="t in view.type" :key="t.id">
                    <button @click="type = t.data">{{ t.data }}</button>
                </li>
            </ul> -->
            <section class="prev-cmp-wrapper flex ">

                <ul class="prev-cmp-filter">
                    <li @click="setFilter('All')" :class="{ active: cmpFilter === 'All' }">All</li>
                    <li @click="setFilter('wap-header')" :class="{ active: cmpFilter === 'wap-header' }">Headers</li>
                    <li @click="setFilter('wap-hero')" :class="{ active: cmpFilter === 'wap-hero' }">Heros</li>
                    <li @click="setFilter('wap-container')" :class="{ active: cmpFilter === 'wap-container' }">Sections
                    </li>
                    <li @click="setFilter('wap-reviews')" :class="{ active: cmpFilter === 'wap-reviews' }">Testimonials
                    </li>
                    <li @click="setFilter('wap-bg-img')" :class="{ active: cmpFilter === 'wap-bg-img' }">Images</li>
                    <li @click="setFilter('wap-footer')" :class="{ active: cmpFilter === 'wap-footer' }">Footer</li>
                </ul>
                <editor-cmp-prev :cmps="cmps" :filter="cmpFilter" />
            </section>
        </section>


        <!-- THEME PICKER -->
        <section v-if="active === 'palette'" class="flex options theme">

            <img src="https://res.cloudinary.com/dzghqfyip/image/upload/v1670082405/wicks/pallte/1.png" alt="">
            <img src="https://res.cloudinary.com/dzghqfyip/image/upload/v1670082405/wicks/pallte/2.png" alt="">
            <img src="https://res.cloudinary.com/dzghqfyip/image/upload/v1670082405/wicks/pallte/3.png" alt="">

        </section>


        <!-- ACTUAL CMP EDITOR -->
        <section class="flex cmp-side-editor ">
            <ul v-if="active === 'edit'">
                <component v-if="editor" :is="editor.el.type + 'Editor'" :info="editor"
                    class="cmp-editor animate__animated animate__fadeInLeft" />
            </ul>
        </section>
    </section>

</template>
<script>
import editorCmpPrev from './editor-cmp-prev.vue'


import txtEditor from './txt-editor.vue'
import imgEditor from './img-editor.vue'
import sectionEditor from './section-editor.vue'



export default {
    name: 'Editor',
    components: { editorCmpPrev, txtEditor, imgEditor,sectionEditor },
    props: { editor: Object },
    data() {
        return {
            view: {},
            type: null,
            data: {},
            active: null,
            cmpFilter: 'All'
        };
    },
    created() {
        this.view = { ...this.cmps }
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
        setFilter(val) {
            this.cmpFilter = val
        },
        toggleActive(val) {
            if (!this.active || this.active !== val) this.active = val
            else this.active = null

        },
        placholder(){
            alert('Hi King!')
        }

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
        }

    }
};
</script>
<style>

</style>
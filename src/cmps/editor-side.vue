<template>
    <section class="main-editor flex">

        <!-- LEFT NAV -->
        <section class="left-nav flex column space-between">
            <section class="flex column">
                <button class="material-symbols-outlined" :class="{ active: active === 'cmp' }"
                    v-tooltip="'Add Section'" @click="toggleActive('cmp')">
                    add_circle
                </button>
                <button class="material-symbols-outlined" v-tooltip="'Pick Palette'"
                    :class="{ active: active === 'palette' }" @click="toggleActive('palette')">
                    palette
                </button>
                <button class="material-symbols-outlined" v-tooltip="'Edit Section'"
                    :class="{ active: active === 'edit' }" @click="toggleActive('edit')">
                    brush
                </button>
            </section>
            <section class="bottom-button flex column">
                <button class="material-symbols-outlined" v-tooltip="'Work With Friends'" @click="placholder">
                    <span class="material-symbols-outlined">
                        groups
                    </span>
                </button>
            </section>
        </section>


        <!-- CMPS ADDITIONS -->
        <section class="options" :class="{ active: active === 'cmp' }">
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
                <editor-cmp-prev :cmps="cmps" :filter="cmpFilter" @closeEditor="(active = null)" />
            </section>
        </section>


        <!-- THEME PICKER -->
        <section class="flex options theme" :class="{ active: active === 'palette' }">
            <h2>Theme</h2>
            <img @click="setTheme('a')"
                src="https://res.cloudinary.com/wicksin/image/upload/v1670082405/wicks/pallte/1.png" alt="">
            <img @click="setTheme('b')"
                src="https://res.cloudinary.com/wicksin/image/upload/v1670082405/wicks/pallte/2.png" alt="">
            <img @click="setTheme('c')"
                src="https://res.cloudinary.com/wicksin/image/upload/v1670082405/wicks/pallte/3.png" alt="">

        </section>


        <!-- ACTUAL CMP EDITOR -->
        <section class="flex cmp-side-editor options" :class="{ active: active === 'edit' && editor }">
            <span class="material-symbols-outlined close-icon" @click="(active = null)">
                disabled_by_default
            </span>
            <ul class="cmp-side-editor">
                <component v-if="editor" :is="editor.el.type + 'Editor'" :info="editor" class="cmp-editor"
                    @clearEditor="clear" />
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
    components: { editorCmpPrev, txtEditor, imgEditor, sectionEditor },
    props: { editor: Object },
    data() {
        return {
            view: {},
            type: null,
            data: {},
            active: null,
            cmpFilter: 'All',
            themes: {
                a: {
                    main: '#333333',
                    secondary: '#345543',
                    break: '#556778',
                    txt: '#ffffff',
                    secondaryTxt:'#333333'
                },
                b: {
                    main: '#111134',
                    secondary: '#ff838f',
                    break: '#f738f8',
                    txt: '#73f73f',
                    secondaryTxt:'#333333'

                },
                c: {
                    main: '#f38292',
                    secondary: '#9393f3',
                    break: '#118ff3',
                    txt: '#1222f3',
                    secondaryTxt:'#333333'
                },
            }
        };
    },
    async created() {
        await this.$store.dispatch({ type: 'loadCmps' })
        this.view = { ...this.cmps }
    },
    methods: {

        setFilter(val) {
            this.cmpFilter = val
        },
        toggleActive(val) {
            if (!this.active || this.active !== val) this.active = val
            else this.active = null
        },
        placholder() {
            alert('Hi King!')
        },

        clear() {
            this.active = null
        },
        setTheme(theme) {
            console.log('hi');
            console.log('theme', this.themes[theme])
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
}
</script>
<style>

</style>
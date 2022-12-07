<template>
    <section class="main-editor flex">

        <!-- LEFT NAV -->
        <section class="left-nav flex column space-between" :class="{ mobile_close: mobileMenuClose }">
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
                <button class="material-symbols-outlined app-btn" @click="toggleMobileButton()">
                    apps
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
            <span class="material-symbols-outlined close-icon" @click="(active = null)">
                disabled_by_default
            </span>
            <h2>Theme</h2>
            <img @click="setTheme('a')"
                src="https://res.cloudinary.com/wicksin/image/upload/v1670276422/wicks/pallte/pal_1_an9yi7.png" alt="">
            <img @click="setTheme('b')"
                src="https://res.cloudinary.com/wicksin/image/upload/v1670276422/wicks/pallte/pal_2_ezy13a.png" alt="">
            <img @click="setTheme('c')"
                src="https://res.cloudinary.com/wicksin/image/upload/v1670276422/wicks/pallte/pal_3_dmrup6.png" alt="">
            <img @click="setTheme('d')"
                src="https://res.cloudinary.com/wicksin/image/upload/v1670276422/wicks/pallte/pal_4png_ypukjj.png" alt="">

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
import { utilService } from '../services/util.service'
import { showUserMsg } from '../services/event-bus.service'


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
            mobileMenuClose: true,
            themes: {
                a: {
                    main: {
                        'background-color': '#333333',
                        'color': '#ffffff'
                    },
                    secondary: {
                        'background-color': '#345543',
                        'color': '#333333'
                    },
                    break: {
                        'background-color': '#556778',
                        'color': '#333333'
                    }
                },
                b: {
                    main: {
                        'background-color': '#111134',
                        'color': 'blue'
                    },
                    secondary: {
                        'background-color': '#ff838f',
                        'color': '#333333'
                    },
                    break: {
                        'background-color': '#f738f8',
                        'color': '#333333'
                    },

                },
                c:
                {
                    main: {
                        'background-color': '#f38292',
                        'color': 'red',
                    },
                    secondary: {
                        'background-color': '#9393f3',
                        'color': '#333333'
                    },
                    break: {
                        'background-color': '#1222f3',
                        'color': '#333333'
                    }
                },
                d: {
                    main: {
                        'background-color': '#f38292',
                        'color': 'red'
                    },
                    secondary: {
                        'background-color': '#9393f3',
                        'color': '#333333'
                    },
                    break: {
                        'background-color': '#1222f3',
                        'color': '#333333'
                    }
                }
            }
        }
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
            const ref = window.location.href
            navigator.clipboard.writeText(ref)
            showUserMsg('Url copied! send it to work together')
        },

        clear() {
            this.active = null
        },
        setTheme(theme) {

            let wap = this.$store.getters.getWapToEdit
            wap = utilService.copy(wap)
            const cmps = wap.cmps.map(cmp => {
                if (cmp.cmps) {
                    cmp.cmps = cmp.cmps.map(innerCmp => {
                        for (let [key, value] of Object.entries(innerCmp.info)) {
                            if (value[0]) {
                                value = value.map(k => {
                                    k.style = {}
                                    return k
                                })
                            } else {
                                value.style = {}
                            }
                            innerCmp.info[key] = value
                        }
                        return innerCmp
                    })
                }
                for (let [key, value] of Object.entries(cmp.info)) {
                    if (value[0]) {
                        value = value.map(k => {
                            k.style = {}
                            return k
                        })
                    } else {
                        value.style = {}
                    }
                    cmp.info[key] = value
                }
                switch (cmp.type) {
                    case 'wap-header':
                    case 'wap-hero':
                    case 'wap-footer':
                        cmp.style = this.themes[theme].main
                        break;
                    case 'wap-container':
                    case 'wap-form':
                    case 'wap-map':
                    case 'wap-reviews':
                        cmp.style = this.themes[theme].secondary
                        break;
                    default:
                        cmp.style = this.themes[theme].break
                }
                return cmp
            })

            wap.cmps = cmps
            try {
                this.$store.dispatch({ type: 'updateWapFull', wap })
            } catch {
                console.log('ops');
            }
        },
        toggleMobileButton() {
            this.mobileMenuClose = !this.mobileMenuClose
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
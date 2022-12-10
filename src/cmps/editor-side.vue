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
                    <span class="material-symbols-outlined">
                        tune
                    </span>
                </button>
                <button class="material-symbols-outlined app-btn" @click="toggleMobileButton()">
                    apps
                </button>
            </section>
            <section class="bottom-button flex column">
                <button class="material-symbols-outlined" v-tooltip="'Work With Friends'" @click="placholder">
                    groups
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
            <!-- <span class="material-symbols-outlined close-icon" @click="(active = null)">
                disabled_by_default
            </span> -->
            <span class="close-editor-icon" @click="(active = null)">
                <span class="material-symbols-outlined arrow">
                    chevron_left
                </span>
                <span class="material-symbols-outlined dote">
                    more_vert
                </span>
            </span>
            <h2>Themes</h2>
            <section class="undo-wrapper">

                <section class="section-cmp-editor undo">
                    <button class="material-symbols-outlined" :disabled="!getHistory.currState" @click="goBack"
                    v-tooltip="'Undo'">
                    undo
                </button>
                <button class="material-symbols-outlined"
                :disabled="(getHistory.currState === getHistory.waps.length - 1)" @click="goForwards"
                v-tooltip="'Redo'">
                redo
            </button>
        </section>
        <hr>
    </section>
            <img @click="setTheme('a')"
                src="https://res.cloudinary.com/wicksin/image/upload/v1670690582/wicks/1_amrigo.jpg" alt="">
            <img @click="setTheme('b')"
                src="https://res.cloudinary.com/wicksin/image/upload/v1670690582/wicks/2_prfgwl.jpg" alt="">
            <img @click="setTheme('c')"
                src="https://res.cloudinary.com/wicksin/image/upload/v1670690582/wicks/3_knuihv.jpg" alt="">
            <img @click="setTheme('d')"
                src="https://res.cloudinary.com/wicksin/image/upload/v1670690583/wicks/4_u1kqb2.jpg" alt="">

        </section>


        <!-- ACTUAL CMP EDITOR -->
        <section class="flex cmp-side-editor options" :class="{ active: active === 'edit' && editor }">
            <!-- <span class="material-symbols-outlined close-icon" @click="(active = null)">
                
                disabled_by_default
            </span> -->
            <span class="close-editor-icon" @click="(active = null)">
                <span class="material-symbols-outlined arrow">
                    chevron_left
                </span>
                <span class="material-symbols-outlined dote">
                    more_vert
                </span>
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
                        'background-color': '#C78AFB',
                        'color': '#ffffff'
                    },
                    secondary: {
                        'background-color': '#FF82D8',
                        'color': '#ffffff'
                    },
                    break: {
                        'background-color': '#FF8DAA',
                        'color': '#ffffff'
                    }
                },
                b: {
                    main: {
                        'background-color': '#FFFFAF',
                        'color': 'blue'
                    },
                    secondary: {
                        'background-color': '#B4DFA4',
                        'color': '#333333'
                    },
                    break: {
                        'background-color': '#76BB9D',
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
                        'background-color': '#D5BEA0',
                        'color': 'red'
                    },
                    secondary: {
                        'background-color': '#9E896C',
                        'color': '#333333'
                    },
                    break: {
                        'background-color': '#FFEDCB',
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
        goBack() {
            this.$store.dispatch({ type: 'goBack' })
        },
        goForwards() {
            this.$store.dispatch({ type: 'goForwards' })
        },
        setTheme(theme) {

            let wap = this.$store.getters.getWapToEdit
            wap = utilService.copy(wap)
            const cmps = wap.cmps.map(cmp => {
                let newTheme
                switch (cmp.type) {
                    case 'wap-header':
                    case 'wap-hero':
                    case 'wap-footer':
                        newTheme = this.themes[theme].main
                        break;
                    case 'wap-container':
                    case 'wap-form':
                    case 'wap-map':
                    case 'wap-reviews':
                        newTheme = this.themes[theme].secondary
                        break;
                    default:
                        newTheme = this.themes[theme].break
                }

                for (let [key, value] of Object.entries(cmp.info)) {
                    if (value['background-image'])
                        newTheme
                    value.style = utilService.copy(newTheme)
                    delete value.style['background-color']

                }

                if (cmp.cmps) {
                    cmp.cmps = cmp.cmps.map(innerCmp => {
                        for (let [key, value] of Object.entries(innerCmp.info)) {
                            if (Array.isArray(value)) {
                                value = value.map(k => {
                                    k.style = utilService.copy(newTheme)
                                    delete k.style['background-color']
                                    // console.log(k);
                                    return k
                                })
                            } else {
                                value.style = utilService.copy(newTheme)
                                value.style['background-color']
                                delete value.style['background-color']

                            }
                            innerCmp.info[key] = value
                        }

                        return innerCmp
                    })
                }

                if (cmp.style['background-image']) {
                    delete newTheme['background-color']
                }
                cmp.style = utilService.copy(newTheme)
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
        getHistory() {
            // TODO: IM FOR REDO UNDO
            return this.$store.getters.getHistory
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
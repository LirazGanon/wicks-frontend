<template>
    <section class="main-editor flex">

        <!-- LEFT NAV -->
        <section class="flex column">
            <button class="material-symbols-outlined" title="Add Section" @click="toggleActive('cmp')">
                add_circle
            </button>
            <button class="material-symbols-outlined" title="Pick Palette"  @click="toggleActive('palette')">
                palette
            </button>
            <button class="material-symbols-outlined" title="Edit"  @click="toggleActive('edit')">
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

            <ul >
                <li v-for="p in 5">
                    <button>
                        חשוכי
                    </button>
                </li>
            </ul>
        </section>


        <!-- ACTUAL CMP EDITOR -->
        <section class="flex">
            <ul v-if="active === 'edit'">
                <li v-for="p in 5">
                    <button>
                        options
                    </button>
                </li>
            </ul>
        </section>
    </section>

</template>
<script>
import editorCmpPrev from './editor-cmp-prev.vue'

export default {
    name: 'Editor',
    components: { editorCmpPrev },
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
    //         this.data = { options:{drop: false, animate: true},
    //         type:[{id: 'fhngh1',data:'HERO 1',cmp:{
    //     "id": "fhngh1",
    //     "type": "wap-header",
    //     "classes": [],
    //     "info": {
    //         "logo": {
    //             "type": "txt",
    //             "txt": "brun.",
    //             "src": "",
    //             "style": {}
    //         },
    //         "nav": {
    //             "id": "wc05",
    //             "type": "wap-nav",
    //             "style": {},
    //             "classes": [],
    //             "info": {
    //                 "links": [
    //                     {
    //                         "type": "txt",
    //                         "txt": "Story",
    //                         "link": "#story",
    //                         "style": {}
    //                     },
    //                     {
    //                         "type": "txt",
    //                         "txt": "Menu",
    //                         "link": "#menu",
    //                         "style": {}
    //                     },
    //                     {
    //                         "type": "txt",
    //                         "txt": "Contact",
    //                         "link": "#contact",
    //                         "style": {}
    //                     },
    //                     {
    //                         "type": "button",
    //                         "txt": "Order online",
    //                         "link": "#order",
    //                         "style": {}
    //                     }
    //                 ]
    //             }
    //         }
    //     },
    //     "style": {}
    // },}] }
 
            // console.log('cmps:', this.data)
        },
        toggleActive(val) {
            this.active = this.active ? null : val
        }
    },
    computed: {
        getData() {
            return this.data
        },
        cmps(){
            return this.$store.getters.cmps
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
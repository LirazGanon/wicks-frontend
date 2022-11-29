<template>
    <section class="main-editor">

        <!-- CMPS ADDITIONS -->
        <section class="flex">
            <button class="material-symbols-outlined" title="Add Section" @click="active = 'cmps'">
                add_circle
            </button>

            <section v-if="active === 'cmps'">


                <ul>
                    <li v-for="t in view.type" :key="t.id">
                        <button @click="type = t.data">{{ t.data }}</button>
                    </li>
                </ul>


                <editor-cmp-prev :cmps="getData" />
            </section>

        </section>


        <!-- THEME PICKER -->
        <section class="flex">
            <button class="material-symbols-outlined" title="Pick Palette" @click="active = 'palette'">
                palette
            </button>

            <ul v-if="active === 'palette'">
                <li v-for="p in 5"  >
                    <button>
                        חשוכי
                    </button>
                </li>
            </ul>


        </section>


        <!-- ACTUAL CMP EDITOR -->

        <section class="flex">

            <button class="material-symbols-outlined" title="Edit" @click="active = 'edit'">
                brush
            </button>

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
    props: { cmps: Object },
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
        this.type = this.cmps.type[0].data
        this.setData()
    },
    methods: {
        setData() {
            const cmps = { ...this.view }

            cmps.type = cmps.type.map((x, i) => ({
                id: Date.now() / 15500 + i,
                data: this.type + ` ${i}`
            }))
            this.data = { ...cmps }
            console.log('cmps:', this.data)
        }
    },
    computed: {
        getData() {
            return this.data
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
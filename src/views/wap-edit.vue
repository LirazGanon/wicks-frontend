<template>
    <h2>wap-edit</h2>


    <section class="wap-editor">

        <editor :cmps="cmps" />

        <wap :wap="wap" />


    </section>


</template>
<script>
import { Container, Draggable } from "vue3-smooth-dnd";
import wap from '../cmps/wap.vue'
import editor from '../cmps/editor.vue'
export default {
    name: 'wap-edit',
    props: {},
    components: { Container, Draggable, editor, wap },
    data() {
        return {
            cmps: {
                type: [{
                    "id": "item-1",
                    "data": "HEADER"
                },
                {
                    "id": "item-2",
                    "data": "HERO"
                },
                {
                    "id": "item-3",
                    "data": "FORUM"
                },
                {
                    "id": "item-4",
                    "data": "TEXT"
                },
                {
                    "id": "item-5",
                    "data": "FOOTER"
                }],
                options: {
                    "drop": false,
                    "animate": true
                }
            },
            wap: {
                layout: [
                    {
                        "id": "item-6",
                        "data": "Draggable 2 - 1"
                    },
                    {
                        "id": "item-7",
                        "data": "Draggable 2 - 2"
                    },
                    {
                        "id": "item-8",
                        "data": "Draggable 2 - 3"
                    },
                    {
                        "id": "item-9",
                        "data": "Draggable 2 - 4"
                    },
                    {
                        "id": "item-10",
                        "data": "Draggable 2 - 5"
                    }
                ],
                options: {
                    "drop": true,
                    "animate": true
                }
            }
        }
    },
    created() { },
    methods: {},
    computed: {},
    unmounted() { },
}
</script>
<style>

</style>
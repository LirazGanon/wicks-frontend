<template>
    <h2>wap-edit</h2>


    <section class="wap-editor flex">
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
                    "data": "FORM"
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
                        id: "item-6",
                        type: "headerCmp",
                        info:{
                            txt:'Im an Header'
                        }
                    },
                    {
                        id: "item-7",
                        type: "heroCmp",
                        info:{
                            txt:'Im an Hero'
                        }
                    },
                    {
                        id: "item-8",
                        type: "formCmp",
                        info:{
                            txt:'Im a Form'
                        }
                    },
                    {
                        id: "item-9",
                        type: "textCmp",
                        info:{
                            txt:'Im a Text'
                        }
                    },
                    {
                        id: "item-10",
                        type: "footerCmp",
                        info:{
                            txt:'Im a Footer'
                        }
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
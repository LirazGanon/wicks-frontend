<template>



    <!-- <section class="editor-top main-container"> Liraz:removed:"main-container" -->
    <section class="editor-top flex">
        <section class="flex space-between full align-center">

            <section class="view-port-editor flex">
                <div class="material-symbols-outlined icon" v-tooltip="'Switch to Desktop'" @click="changeView('100')">
                    desktop_windows
                </div>
                <div class="material-symbols-outlined icon" v-tooltip="'Switch to Tablet'" @click="changeView('860')">
                    tablet_mac
                </div>
                <div class="material-symbols-outlined icon" v-tooltip="'Switch to Mobile'" @click="changeView('420')">
                    phone_iphone
                </div>
            </section>
            <div class="dynamic-url">
                <div class="material-symbols-outlined">
                    vpn_key
                </div>
                <span>https</span>
                <span>://wicks.in/</span>
                <span contenteditable="true" @input="chooseUrl">my-site</span>
            </div>

            <section class="preview-container flex">
                <!-- <button class="material-symbols-outlined site-preview" v-tooltip="'Site Preview'" @click="placholder">
                        visibility
                    </button> -->
                <div class="site-preview">
                    <!-- <router-link :to="(`/wap/` + wapId)" class="flex"> -->
                    <span>Preview</span>
                    <!-- <span class="material-symbols-outlined">
                            visibility
                        </span> -->
                    <!-- </router-link> -->

                </div>
                <div class="site-publish">

                    <div @click="publish" class="flex">
                        <span>Publish</span><span class="material-symbols-outlined">
                            publish
                        </span>
                    </div>

                </div>

            </section>

        </section>

    </section>


</template>
<script>
import { eventBus } from '../services/event-bus.service';


export default {
    name: 'Editor-top',
    components: {},
    data() {
        return {
            pathName: null
        };
    },
    created() {

    },
  
    methods: {
        changeView(size) {
            eventBus.emit('resizeWap', size)
        },
        chooseUrl(ev) {
            this.pathName = ev.target.innerText
        },

    },
    computed: {
        wapId() {
            return this.$route.params.wapId
        },
        goBack() {
            // TODO: IM FOR REDO UNDO

            this.$store.dispatch({ type: 'goBack' })
        },
        goForwards() {
            // TODO: IM FOR REDO UNDO

            this.$store.dispatch({ type: 'goForwards' })
        },
        getHistory() {
            // TODO: IM FOR REDO UNDO
            return this.$store.getters.getHistory
        },
        publish() {
            this.$emit('published', this.pathName)
        },
    },
    watch: {

    }
};
</script>
<style>

</style>
<template>

    <section class="editor-header flex space-between">
        <router-link to="/">
            <span role="img" aria-label="logo">
                <img class="logo" src="@/assets/logo-black.png" alt="">
            </span>
        </router-link>

        <nav class="flex align-center">
      <router-link to="/wap">Template</router-link>

      <router-link to="/review">Reviews</router-link>
      <router-link to="/chat">Chat</router-link>
      <router-link to="/login">Login / Signup</router-link>
    </nav>
    </section>

    <!-- <section class="editor-top main-container"> Liraz:removed:"main-container" -->
    <section class="editor-top flex">
        <section class="flex space-between full align-center">
            <section class="undo-redo">
            <button class="material-symbols-outlined" :disabled="!getHistory.currState" @click="goBack"
                v-tooltip="'Undo'">
                undo
            </button>
            <button class="material-symbols-outlined" :disabled="(getHistory.currState === getHistory.waps.length - 1)"
                @click="goForwards" v-tooltip="'Redo'">
                redo
            </button>
        </section>

            <section class="view-port-editor flex">
                <div class="material-symbols-outlined icon" v-tooltip="'Switch to Desktop'" @click="changeView('100')">
                    desktop_windows
                </div>
                <div class="material-symbols-outlined icon"
                v-tooltip="'Switch to Tablet'" @click="changeView('860')">
                    tablet_mac
                </div>
                <div class="material-symbols-outlined icon"  v-tooltip="'Switch to Mobile'" @click="changeView('420')">
                    phone_iphone
                </div>
            </section>
            <div class="dynamic-url">
                <div class="material-symbols-outlined">
                    vpn_key
                </div>
                <span>https</span>
                <span>://wicks.in/</span>
                <span contenteditable="true">my-site</span>
            </div>

            <section class="preview-container flex">
                <!-- <button class="material-symbols-outlined site-preview" v-tooltip="'Site Preview'" @click="placholder">
                        visibility
                    </button> -->
                <div class="site-preview">
                    <!-- <router-link :to="(`/wap/` + wapId)" class="flex"> -->
                        <span>Preview</span><span class="material-symbols-outlined">
                            visibility
                        </span>
                    <!-- </router-link> -->
    
                </div>
                <div class="site-publish">
                    
                    <router-link :to="(`/wap/` + wapId)" class="flex">
                        <span>Publish</span><span class="material-symbols-outlined">
                            publish
                        </span></router-link>
    
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

        };
    },
    created() {

    },
    methods: {
        changeView(size){
            eventBus.emit('resizeWap',size)
        }
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
        }
    },
    watch: {

    }
};
</script>
<style>

</style>
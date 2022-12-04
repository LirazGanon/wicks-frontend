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
            <section class="view-port-editor flex">
                <div class="material-symbols-outlined icon" v-tooltip="'Switch to Desktop'" @click="changeView('')">
                    desktop_windows
                </div>
                <div class="material-symbols-outlined icon"
                v-tooltip="'Switch to Tablet'" @click="changeView('800px')">
                    tablet_mac
                </div>
                <div class="material-symbols-outlined icon"  v-tooltip="'Switch to Mobile'" @click="changeView('400px')">
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
        changeView(value){
            // vue3.jQuerySelector('.doda').style.display = 'none'
            document.querySelector('.wap-editor').style.maxWidth  = value
        }
    },
    computed: {
        wapId() {
            return this.$route.params.wapId
        }
    },
    watch: {

    }
};
</script>
<style>

</style>
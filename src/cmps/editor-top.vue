<template>

    <section class="editor-header">
        <router-link to="/">
            <span role="img" aria-label="logo">
                <img class="logo" src="@/assets/logo-black.png" alt="">
            </span>
        </router-link>
    </section>

    <section class="editor-top main-container">
        <section class="flex space-between">
            <section class="view-port-editor flex">
                <div class="material-symbols-outlined icon">
                    desktop_windows
                </div>
                <div class="material-symbols-outlined icon">
                    tablet_mac
                </div>
                <div class="material-symbols-outlined icon">
                    phone_iphone
                </div>

             

            </section>
            <div class="dynamic-url">
                    <div class="material-symbols-outlined">
                        vpn_key
                    </div>
                    <span>https</span>
                    <span>://wicks.renderapp.com/</span>
                    <span contenteditable="true">my-site</span>
                </div>

            <div class="site-preview">
                <span>Preview</span>
            </div>


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

    },
    computed: {

    },
    watch: {

    }
};
</script>
<style>

</style>
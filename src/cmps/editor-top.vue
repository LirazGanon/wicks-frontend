<template>



    <!-- <section class="editor-top main-container"> Liraz:removed:"main-container" -->
    <section class="editor-top flex">
        <section class="flex  full align-center">

            <section class="view-port-editor flex">
                <div class="material-symbols-outlined icon" :class="{ active: viewSize === '100' }"
                    v-tooltip="'Switch to Desktop'" @click="changeView('100')">
                    desktop_windows
                </div>
                <div class="material-symbols-outlined icon" :class="{ active: viewSize === '860' }"
                    v-tooltip="'Switch to Tablet'" @click="changeView('860')">
                    tablet_mac
                </div>
                <div class="material-symbols-outlined icon" :class="{ active: viewSize === '450' }"
                    v-tooltip="'Switch to Mobile'" @click="changeView('450')">
                    phone_iphone
                </div>
            </section>
            <div class="right-editor-top flex">

                <div class="dynamic-url">
                    <!-- <div class="material-symbols-outlined">
                        vpn_key
                    </div> -->
                    <span>https</span>
                    <span>://wicks.in/</span>
                    <span class="choose-url" contenteditable="true" @input="chooseUrl">my-site-name</span>
                    <span class="material-symbols-outlined arrow">
                        keyboard_backspace
                    </span>

                    
                      
                    <name-modal v-if="nameModalOpen" @close="closeNameModal"  />

                </div>

                <section class="preview-container flex">
                    <!-- <button class="material-symbols-outlined site-preview" v-tooltip="'Site Preview'" @click="placholder">
                        visibility
                    </button> -->
                    <div class="site-preview">
                        <router-link :to="(`/wap/` + wapId)" class="flex">
                        <span>Preview</span>
                      
                        </router-link>

                    </div>
                    <div class="site-publish">

                        <div @click="publish" class="flex">
                            <span>Publish</span>
                        </div>

                    </div>

                </section>
            </div>

        </section>

    </section>


</template>
<script>
import { eventBus } from '../services/event-bus.service';
import loginModal from '../cmps/login-modal.vue'
import nameModal from '../cmps/name-modal.vue'
import { userService } from '../services/user.service';
import { utilService } from '../services/util.service';
export default {
    name: 'Editor-top',
    components: { loginModal, nameModal },
    data() {
        return {
            url: null,
            viewSize: '100',
            pathName: null,
            loginModalOpen: false,
            nameModalOpen: false,
        };
    },
    created() {

    },

    methods: {
        changeView(size) {
            this.viewSize = size;
            eventBus.emit('resizeWap', size)
        },
        chooseUrl(ev) {
            this.pathName = ev.target.innerText
        },
        async updateName(pathName) {
            switch(pathName){
                case '':
                case 'wap':
                case 'home':
                case 'review':
                case 'chat':
                case 'my-site-name':
                    return false
            }
            // if (pathName === 'wap' || pathName === '' || pathName === 'home' ||
            //     pathName === 'review' || pathName === 'chat') return false//nidicate the user 'invalid site name'
            try {
                const wap = utilService.copy(this.$store.getters.getWapToEdit)
                wap.pathName = pathName
                return await this.$store.dispatch({ type: 'updatePathName', pathName })
            } catch (err) {
                console.log(err.response.data)
                //indication to the user that the name is taken
            }
        },
        async tryPublish(pathName) {
            try {
                const wap = utilService.copy(this.$store.getters.getWapToEdit)
                let user = userService.getLoggedinUser()
                if (!user) {
                    // this.loginModalOpen = true
                    this.$emit('toggleLogin')
                    return
                }
                // checking if user gave name to his site
                const name = await this.updateName(pathName)
                if (!name) {
                    this.nameModalOpen = true
                    console.log('i am taken')
                    return
                }
                wap.pathName = pathName
                user = { _id: user._id, fullname: user.fullname, imgUrl: user.imgUrl }
                wap.createdBy = user
                wap.isPublish = true

                const routName = pathName ? 'published' : 'wap-view'
                const params = pathName ? { pathName } : { wapId: wap._id }
                await this.$store.dispatch({ type: 'updateWapFull', wap })
                let routeData = this.$router.resolve({ name: routName, params })
                window.open(routeData.href, '_blank')
                this.$router.push(`/user/${user._id}`)
                console.log('Published Successfully');
            } catch (err) {
                console.log(err);
            }
        },
        closeLoginModal() {
            this.loginModalOpen = false
        },
        onToggleLoginModal() {
            this.loginModalOpen = !this.loginModalOpen
        },
        closeNameModal() {
            this.nameModalOpen = false
        },
        onToggleNameModal() {
            this.nameModalOpen = !this.nameModalOpen
        },
        publish() {
            eventBus.emit('reselect', null)
            this.tryPublish(this.pathName)
            // this.$emit('published', this.pathName)
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
        
    },
    watch: {

    }
};
</script>
<style>

</style>
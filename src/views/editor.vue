<template>

    <login-modal v-if="loginModalOpen" @close="closeLoginModal" v-click-outside="onToggleLoginModal"/>


    <main class="edit-container">
        <app-header :mainLayout="'main-header'" />
        <editor-top  @toggleLogin="onToggleLoginModal"/>
        <section class="wap-editor flex">
            <!-- EDITOR TOP -->
            <editor-side :cmps="cmps" v-if="cmps" :editor="editor" />
            <editor-wap @openEditor="openEditor" />
        </section>


    </main>



</template>

<script>
import editorWap from '../cmps/editor-wap.vue'
import editorSide from '../cmps/editor-side.vue'
import editorTop from '../cmps/editor-top.vue'
import appHeader from '../cmps/app-header.vue'
import loginModal from '../cmps/login-modal.vue'
import nameModal from '../cmps/name-modal.vue'
import { utilService } from '../services/util.service'
import { userService } from '../services/user.service'
export default {
    name: 'wap-edit',
    props: {},
    components: { editorSide, editorWap, editorTop, appHeader, loginModal,nameModal },
    data() {
        return {
            type: null,
            editor: null,
            loginModalOpen: false,
            nameModalOpen: false,
        }
    },
    methods: {
        openEditor(editorContent) {
            this.editor = editorContent
        },
        async updateName(pathName) {
            if (pathName === 'wap' || pathName === '' || pathName === 'home' ||
                pathName === 'review' || pathName === 'chat') return false//nidicate the user 'invalid site name'
            try {
                const wap = utilService.copy(this.$store.getters.getWapToEdit)
                wap.pathName = pathName
                return await this.$store.dispatch({ type: 'updatePathName', pathName })
            } catch (err) {
                console.log(err.response.data)
                //indication to the user that the name is taken
            }
        },
        async publish(pathName) {
            try {
                const wap = utilService.copy(this.$store.getters.getWapToEdit)
                let user = userService.getLoggedinUser()
                if (!user) {
                    this.loginModalOpen = true
                    return
                }
                // checking if user gave name to his site
                const name = await this.updateName(pathName)
                if(!name){
                    this.nameModalOpen=true
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
        toggleLogin(){
        }
    },
    computed: {
        cmps() {
            return this.$store.getters.cmps
        },
    },
    unmounted() { },
}
</script>
<style>

</style>
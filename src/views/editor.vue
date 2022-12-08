<template>
    <main class="edit-container">
        <app-header :mainLayout="''" />
        <editor-top @published="publish" />
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
import { utilService } from '../services/util.service'
import { userService } from '../services/user.service'
export default {
    name: 'wap-edit',
    props: {},
    components: { editorSide, editorWap, editorTop, appHeader },
    data() {
        return {
            type: null,
            editor: null,
        }
    },
    methods: {
        openEditor(editorContent) {
            this.editor = editorContent
        },
        async updateName(pathName){
            try{
                const wap = utilService.copy(this.$store.getters.getWapToEdit)
                wap.pathName = pathName
                await this.$store.dispatch({ type: 'updateWapFull', wap })
            } catch(err){
            
            }
        },
        async publish(pathName) {
            try {
                const wap = utilService.copy(this.$store.getters.getWapToEdit)
                if (pathName) wap.pathName = pathName
                let user = userService.getLoggedinUser()
                if (!user) return
                user = { _id: user._id, fullname: user.fullname, imgUrl: user.imgUrl }
                wap.createdBy = user
                wap.isPublish = true
                
                const routName = pathName ? 'published' : 'wap-view'
                const params = pathName ? {pathName} : {wapId: wap._id}
                await this.$store.dispatch({ type: 'updateWapFull', wap })
                let routeData = this.$router.resolve({ name: routName, params })
                window.open(routeData.href, '_blank')
                console.log('Published Successfully');
            } catch (err) {
                console.log(err);
            }
        },
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
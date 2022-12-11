<template>
    <section class="main-layout full wap-form-warper" :style="cmp.style" :class="cmp.classes">

        <section class="wap-form">
            <img v-for="img in cmp.info.imgs" :src="img.src" alt="" class="wap-img" :class="img?.classes"
                :style="img.style" />
            <span>

                <h1 v-if="cmp.info.heading?.txt" :style="cmp.info.heading.style">{{ cmp.info.heading.txt }}
                </h1>

                <p v-if="cmp.info.subHeading?.txt" :style="cmp.info.subHeading?.style">
                    {{
                            (cmp.info.subHeading?.txt)
                    }}</p>


                <form @submit.prevent="sendMsg">
                    <label v-if="cmp.info.textInput">
                        <span v-if="cmp.info.textInput?.label">{{ cmp.info.textInput.label }}</span>
                        <input type="text" v-model="textInput" required :placeholder="cmp.info.textInput.placeholder" />

                    </label>
                    <label v-if="cmp.info.emailInput">
                        <span v-if="cmp.info.emailInput?.label">{{ cmp.info.emailInput.label }}</span>
                        <input type="email" v-model="emailInput" required
                            :placeholder="cmp.info.emailInput.placeholder" />
                    </label>
                    <label v-if="cmp.info.textarea">
                        <span v-if="cmp.info.textarea?.label">{{ cmp.info.textarea.label }}</span>
                        <textarea v-model="messageInput" required></textarea>
                    </label>
                    <button v-for="btn in cmp.info.btns" :style="btn.style">{{ btn.txt }}</button>
                </form>
            </span>
        </section>
    </section>

</template>
   

<script>
import {socketService, SOCKET_EMIT_SEND_LEAD, SOCKET_EMIT_SET_ROOM} from '../../services/socket.service.js'
import { wapService } from '../../services/wap.service';
import { showUserMsg } from '../../services/event-bus.service'

export default {
    name: 'dynamic-form-cmp',
    props: { cmp: Object },
    components: {},
    data() {
        return {
            textInput: '',
            emailInput: '',
            messageInput: ''
        };
    },
    created() {
    
    },
    methods: {
        async sendMsg() {
            try{
                if (this.isTemplate) return
                const contact = { name: this.textInput, email: this.emailInput, msg: this.messageInput, at: Date.now() }
                const wap = await this.wap
                wap.usersData.contacts.push(contact)
                socketService.emit(SOCKET_EMIT_SEND_LEAD, {room: wap.createdBy._id, contact, wapId:wap._id, wap} )
                this.$store.dispatch({ type: 'updateWapFull', wap })
                this.textInput = ''
                this.emailInput = ''
                this.messageInput = ''
                showUserMsg('Message sent successfully')

            }catch{
                showUserMsg('could not send message')
            }
        },
    },
    computed: {
       async  wap() {
          
            const url = this.$route.params
            const { isTemplate } = this.$route.params
            console.log(url)
            if (isTemplate) {
                return  await templateService.getTemplate(url.wapId)
            } else {
                return await wapService.getById(url)
            }
        },
        isTemplate() {
            const { isTemplate } = this.$route.params
            if (isTemplate) return isTemplate
        }
    },
    unmounted() { },
};
</script>

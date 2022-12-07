<template>
    <section class="main-layout full wap-form-warper" :style="cmp.style" :class="cmp.classes">

        <section class="wap-form">
            <h1 v-if="cmp.info.heading?.txt" :style="cmp.info.heading.style">{{ cmp.info.heading.txt }}
            </h1>

            <p v-if="cmp.info.subHeading?.txt" :style="cmp.info.subHeading?.style">
                {{
                        (cmp.info.subHeading?.txt)
                }}</p>


            <form @submit.prevent="sendMsg">
                <label v-if="cmp.info.textInput">
                    <span v-if="cmp.info.textInput?.label">{{ cmp.info.textInput.label }}</span>
                    <input type="text" v-model="textInput" required  :placeholder="cmp.info.textInput.placeholder"/>

                </label>
                <label v-if="cmp.info.emailInput">
                    <span v-if="cmp.info.emailInput?.label">{{ cmp.info.emailInput.label }}</span>
                    <input type="email" v-model="emailInput" required :placeholder="cmp.info.emailInput.placeholder"/>
                </label>
                <label v-if="cmp.info.textarea">
                    <span v-if="cmp.info.textarea?.label">{{ cmp.info.textarea.label }}</span>
                    <textarea v-model="messageInput" required></textarea>
                </label>
                <button v-for="btn in cmp.info.btns" :style="btn.style">{{ btn.txt }}</button>
            </form>
        </section>
    </section>

</template>
   

<script>
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
    created() { },
    methods: {
        async sendMsg() {
            if (this.isTemplate) return
            const contact = { name: this.textInput, email: this.emailInput, mag: this.messageInput, at: Date.now() }
            const wap = await this.wap
            wap.usersData.contacts.push(contact)
            this.$store.dispatch({ type: 'updateWapFull', wap })
        },
    },
    computed: {
        wap() {
            const id = this.$route.params.wapId
            return this.$store.dispatch({ type: 'getWapById', id })
        },
        isTemplate() {
            const { isTemplate } = this.$route.params
            if (isTemplate) return isTemplate
        }
    },
    unmounted() { },
};
</script>
<style>

</style>
<!-- <input type="email"> -->
        <!-- <div v-for="input, idx in cmp.info.inputs">
            <label for="">{{input.label}}</label>
            <input v-if="input.inpType === 'input'" 
            :type="input.inpContentType"
            :placeholder="input.placeholder"
            v-model="contact[idx]"
            >

            <textarea v-if="input.inpType === 'textarea'"
            :type="input.inpContentType"
            :placeholder="input.placeholder">
            </textarea>
        </div> -->
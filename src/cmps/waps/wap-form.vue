<template>
    <section class="wap-form" :class="cmp.classes">
        <pre>{{wap}}</pre>

        <!-- <h4>form-{{ info.heading.txt }}</h4> -->
        
        <form >
            <label >
                {{cmp.info}}
                <span v-if="cmp.info.textInput.label">{{cmp.info.textInput.label}}</span>
                <input  type="text" v-model="textInput" />
        
            </label>
            <label >
                <span v-if="cmp.info.emailInput.label">{{cmp.info.emailInput.label}}</span>
                <input  type="email" v-model="emailInput" />
            </label>
            <label >
                <span v-if="cmp.info.textarea.label">{{cmp.info.textarea.label}}</span>
                <textarea v-model="messageInput" ></textarea>
            </label>
            <button v-for="btn in cmp.info.btns" @click.prevent="sendMsg">{{btn.txt}}</button>
        </form>
        </section>
        </template>
   

   <script>
export default {
    name: 'dynamic-form-cmp',
    props: { cmp: Object },
    components: {},
    data() {
        return {
            textInput:'',
            emailInput:'',
            messageInput:''       
         };
    },
    created() {},
    methods: {
        async sendMsg(){
            if(this.isTemplate)return
            const contact = {name:this.textInput, email:this.emailInput, mag:this.messageInput, at:Date.now()}  
            const wap = await  this.wap  
        wap.usersData.contacts.push(contact)
        this.$store.dispatch({type:'updateWapFull', wap})
        },
    },
    computed: {
    wap(){
        const id = this.$route.params.wapId
      return   this.$store.dispatch({type:'getWapById', id})
    },
    isTemplate(){
        const { isTemplate } = this.$route.params
        if(isTemplate)return isTemplate
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
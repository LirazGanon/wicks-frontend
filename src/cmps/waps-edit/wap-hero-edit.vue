<template>

    <section class="main-layout full" :style="cmp.style">

        <section class="wap-hero " :class="cmp.classes">

            <h1 contenteditable="true" @click="openEditor('heading')">{{ cmp.info.heading.txt }}</h1>
            <p contenteditable="true" @click="openEditor('subHeading')">{{ (cmp.info.subHeading.txt) }}</p>

            <button contenteditable="true" v-for="(btn,idx) in cmp.info.btns" @click="openEditor(btn)">
                {{ btn.txt }}
            </button>

            <img :src="img.src" v-for="(img, idx) in cmp.info.imgs" alt="" class="wap-img"
                @click="openEditor('imgs', idx)">


                
            <img :src="cmp.info.bgImg.src" alt="" class="wap-bg-img" @click="openEditor('bgImg')">
        </section>
    </section>

</template>
<script>
export default {
    name: 'dynamic-hero-cmp',
    props: { cmp: Object },
    components: {},
    data() {
        return {}
    },
    created() { },
    methods: {
        openEditor(key, idx) {
            const el = idx ? this.cmp.info[key][idx] : this.cmp.info[key]
            const wapContent = { el, id: this.cmp.id }
            this.$emit('openEditor', wapContent)
        }
    },
    computed: {},
    unmounted() { },
};
</script>
<style>

</style>
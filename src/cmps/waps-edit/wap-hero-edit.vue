<template>

    <section class="main-layout full" :style="cmp.style">

        <section class="wap-hero " :class="cmp.classes">

            <h1 contenteditable="true" @click="openEditor('heading')" :style="cmp.info.heading.style" @input="updateCmp"
                data-type="heading">
                {{ cmp.info.heading.txt }}
            </h1>
            <p contenteditable="true" @click="openEditor('subHeading')" :style="cmp.info.subHeading.style"
                @input="updateCmp" data-type="subHeading">{{
                        (cmp.info.subHeading.txt)
                }}</p>

            <button contenteditable="true" v-for="(btn, idx) in cmp.info.btns" @click="openEditor(btn)"
                :style="cmp.info.btns[idx].style">
                {{ btn.txt }}
            </button>

            <img :src="img.src" v-for="(img, idx) in cmp.info.imgs" alt="" class="wap-img"
                @click="openEditor('imgs', idx)"
                :style="img.style">



            <img :src="cmp.info.bgImg.src" :style="cmp.info.bgImg.style" alt="" class="wap-bg-img" @click="openEditor('bgImg')">
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
            const el = (idx !== undefined) ? this.cmp.info[key][idx] : this.cmp.info[key]

            const wapContent = {
                key,
                id: this.cmp.id,
                idx,
                type: el.type,
                style: el.style
            }
            this.$emit('openEditor', wapContent)
        },
        log(ev) {
            console.log(ev.target.innerText);
            console.log(ev.target.dataset.type);
        },
        updateCmp(ev) {
            let wap = this.$store.getters.getWapToEdit
            const idx = wap.cmps.findIndex(cmp => cmp.id === this.cmp.id)
            let puk = JSON.parse(JSON.stringify(this.cmp))
            puk.info[ev.target.dataset.type].txt = ev.target.innerText
            wap = JSON.parse(JSON.stringify(wap))
            wap.cmps[idx] = puk
            try {
                this.$store.dispatch({ type: 'updateWap', wap })
            } catch {
                console.log('ops')
            }
        }
    },
    computed: {},
    unmounted() { },
};
</script>
<style>

</style>
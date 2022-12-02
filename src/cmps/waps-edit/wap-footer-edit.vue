<template>
    <section class="main-layout full" :style="cmp.style">
        <section class="wap-footer" :class="cmp.classes">

            <!-- <h1 contenteditable="true"
                 @click="openEditor('heading')"
                  :style="cmp.info.heading.style"
                   @input="updateCmp"
                    data-type="heading">

                {{ cmp.info.heading.txt }}
            </h1> -->

          

            <p v-if="(cmp.info.logo.type === 'txt')"
             class="logo" contenteditable="true"
             @click="openEditor('logo')"
             :style="cmp.info.logo.style"
             @input="updateCmp"
             data-type="logo"
             >
             
             {{ cmp.info.logo.txt }}</p>
            <img v-if="(cmp.info.logo.type === 'img')" class="logo" src="{{ cmp.info.logo.src}}">
            <p class="copyright">{{ cmp.info.copyright.txt }}</p>
        </section>
    </section>

</template>
<script>
export default {
    name: 'dynamic-footer-cmp',
    props: { cmp: Object },
    components: {},
    data() {
        return {};
    },
    created() { },
    methods: {
        openEditor(key, idx,innerIdx ) {
            const el = (idx !== undefined) ? this.cmp.info[key][idx] : this.cmp.info[key]
// console.log(key, idx)
            const wapContent = {
                key,
                id: this.cmp.id,
                idx,
                type: el.type||el.texts[innerIdx].type,
                style: el.style||el.texts[innerIdx].style
            }
            console.log('el', el)
            console.log('key', wapContent)
            this.$emit('openEditor', wapContent)
        },
        updateCmp(ev, outerIdx, innerIdx) {
            console.log(ev)
            let wap = this.$store.getters.getWapToEdit
            const cmpIdx = wap.cmps.findIndex(cmp => cmp.id === this.cmp.id)
            let puk = JSON.parse(JSON.stringify(this.cmp))
            puk.info[ev.target.dataset.type][outerIdx].texts[innerIdx].txt = ev.target.innerText
            wap = JSON.parse(JSON.stringify(wap))
            wap.cmps[cmpIdx] = puk
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
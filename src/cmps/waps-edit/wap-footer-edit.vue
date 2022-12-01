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

            <div v-for="(txts, idx) in cmp.info.details">
                <p v-for="txt in txts.texts" contenteditable="true" @click="openEditor('details', idx)"
                    :style="cmp.info.details[idx].style" @input="updateCmp" data-type="details">
                    >{{ txt }}
                </p>
            </div>

            <p v-if="(cmp.info.logo.type === 'txt')"
             class="logo" contenteditable="true"
             @click="openEditor('logo')"
             :style="cmp.info.logo.style"
             @input="updateCmp"
             data-type="logo"
             >
             
             {{ cmp.info.logo.txt }}</p>
            <img v-if="(cmp.info.logo.type === 'img')" class="logo" src="{{ cmp.info.logo.src}}">

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
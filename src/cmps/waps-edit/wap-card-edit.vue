<template>
    <section class="wap-card" v-if="cmp.info">
        <h1 contenteditable="true" @click="openEditor('heading')" :style="cmp.info.heading.style"
            @input="updateCmp($event, 'heading')">{{ cmp.info.heading?.txt }}</h1>

        <p contenteditable="true" @click="openEditor('subHeading')" :style="cmp.info.subHeading?.style"
            @input="updateCmp($event, 'subHeading')">{{ cmp.info.subHeading?.txt }}</p>
        <p v-for="(txt, idx) in cmp.info.texts" contenteditable="true" @click="openEditor('texts', idx)"
            :style="txt?.style" @input="updateCmp($event, 'texts', idx)">{{ txt.txt }}</p>

        <button v-for="(btn, idx) in cmp.info.btns" contenteditable="true" @click="openEditor('btns', idx)"
            :style="btn.style" @input="updateCmp($event, 'btns', idx)">{{ btn.txt }}</button>
    </section>



    <!-- <a href="" v-for="(l, idx) in nav.info.links" contenteditable="true" @click="openEditor('links', idx)"
        :style="nav.info.links[idx].style" @input="updateCmp($event, idx)" data-type="links"> {{ l.txt
        }}</a> -->

</template>
<script>
export default {
    name: 'dynamic-review-cmp',
    props: { cmp: Object, path: Object },
    components: {},
    data() {
        return {};
    },
    created() { },
    methods: {
        openEditor(key, i) {
            const el = (i !== undefined) ? this.cmp.info[key][i] : this.cmp.info[key]
            const wapContent = {
                key,
                path: this.path,
                el,
                currCmp: this.cmp,
                elIdx: i
            }
            console.log(wapContent);
            this.$emit('openEditor', wapContent)
        },
        updateCmp(ev, key, innerIdx) {
            let wap = this.$store.getters.getWapToEdit
            const cmpIdx = wap.cmps.findIndex(cmp => cmp.id === this.cmpId)
            let cmpCopy = JSON.parse(JSON.stringify(this.cmp))
            wap = JSON.parse(JSON.stringify(wap))

            if (innerIdx !== undefined) {
                cmpCopy.info[key][innerIdx].txt = ev.target.innerText
            } else {
                cmpCopy.info[key].txt = ev.target.innerText
            }
            console.log('cmpIdx:', cmpIdx)
            console.log('wap', wap.cmps[cmpIdx].info.cmps.find(cmp => cmp.type === cmpCopy.type));
            console.log('cmpCopy:', cmpCopy.info[key])

            const sadIdx = wap.cmps[cmpIdx].info.cmps.findIndex(cmp => cmp.type === cmpCopy.type)

            wap.cmps[cmpIdx].info.cmps[sadIdx] = cmpCopy
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
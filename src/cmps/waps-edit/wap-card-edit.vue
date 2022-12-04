<template>
    <section class="wap-card" v-if="cmp.info">
        <h1 contenteditable="true" @click.stop="openEditor('heading')" :style="cmp.info.heading?.style"
            @input="updateCmp($event, 'heading')">{{ cmp.info.heading?.txt }}</h1>

        <p contenteditable="true" @click.stop="openEditor('subHeading')" :style="cmp.info.subHeading?.style"
            @input="updateCmp($event, 'subHeading')">{{ cmp.info.subHeading?.txt }}</p>
        <p v-for="(txt, idx) in cmp.info.texts" contenteditable="true" @click.stop="openEditor('texts', idx)"
            :style="txt?.style" @input="updateCmp($event, 'texts', idx)">{{ txt.txt }}</p>

        <button v-for="(btn, idx) in cmp.info.btns" contenteditable="true" @click.stop="openEditor('btns', idx)"
            :style="btn.style" @input="updateCmp($event, 'btns', idx)">{{ btn.txt }}</button>
        <img v-for="(img, idx) in cmp.info.imgs" @click.stop="openEditor('imgs', idx)" :src="img.src"
            :style="img.style" />
    </section>


    


    <!-- <a href="" v-for="(l, idx) in nav.info.links" contenteditable="true" @click="openEditor('links', idx)"
        :style="nav.info.links[idx].style" @input="updateCmp($event, idx)" data-type="links"> {{ l.txt
        }}</a> -->

</template>
<script>
import { utilService } from '../../services/util.service';

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
            let el = (i !== undefined) ? this.cmp.info[key][i] : this.cmp.info[key]
            el = utilService.copy(el)
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
            const path = this.path
            let cmpCopy = JSON.parse(JSON.stringify(this.cmp))
            wap = JSON.parse(JSON.stringify(wap))

            console.log(this.path);
            console.log(cmpCopy.info[key])

            if (innerIdx !== undefined) {
                cmpCopy.info[key][innerIdx].txt = ev.target.innerText
            } else {
                cmpCopy.info[key].txt = ev.target.innerText
            }

            if (path.idx !== undefined) {
                wap.cmps[path.fatherIdx].cmps[path.idx] = cmpCopy
            } else {
                wap.cmps[path.fatherIdx] = cmpCopy
            }

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
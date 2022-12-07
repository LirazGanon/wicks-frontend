<template>
    <section class="wap-card" v-if="cmp.info" :class="cmp.classes">
        <section class="card-details"> 

        <h1 contenteditable="true" @click.stop @mousedown.stop="openEditor('heading')" :style="cmp.info.heading?.style"
            @blur="updateCmp($event, 'heading')">{{ cmp.info.heading?.txt }}</h1>

        <p contenteditable="true" @click.stop @mousedown.stop="openEditor('subHeading')"
            :style="cmp.info.subHeading?.style" @blur="updateCmp($event, 'subHeading')">{{ cmp.info.subHeading?.txt }}
        </p>
        <p v-for="(txt, idx) in cmp.info.texts" contenteditable="true" @click.stop
            @mousedown.stop="openEditor('texts', idx)" :style="txt?.style" @blur="updateCmp($event, 'texts', idx)">{{
                    txt.txt
            }}</p>

        <button v-for="(btn, idx) in cmp.info.btns" contenteditable="true" @click.stop
            @mousedown.stop="openEditor('btns', idx)" :style="btn.style" @blur="updateCmp($event, 'btns', idx)">{{
                    btn.txt
            }}</button>
        </section>

        <img v-for="(img, idx) in cmp.info.imgs" @click.stop @mousedown.stop="openEditor('imgs', idx)"
            @dragstart.prevent :src="img.src" :style="img.style" />
    </section>





    <!-- <a href="" v-for="(l, idx) in nav.info.links" contenteditable="true" @click="openEditor('links', idx)"
        :style="nav.info.links[idx].style" @blur="updateCmp($event, idx)" data-type="links"> {{ l.txt
        }}</a> -->

</template>
<script>
import { utilService } from '../../services/util.service';

export default {
    name: 'dynamic-review-cmp',
    props: { cmp: Object, path: Object },
    components: {},
    data() {
        return {

        };
    },
    created() {
    },
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
            this.$emit('openEditor', wapContent)
        },
        updateCmp(ev, key) {
            const path = this.path
            let cmp = utilService.copy(this.cmp)

            if (cmp.info[key].txt === ev.target.innerText) return

            console.log('variable:', cmp.info[key].txt === ev.target.innerText)
            console.log(cmp.info[key].txt);
            console.log(ev.target.innerText);

            cmp.info[key].txt = ev.target.innerText

            try {
                this.$store.dispatch({ type: 'updateWap', cmp, path })
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
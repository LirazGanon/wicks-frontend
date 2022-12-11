<template>
    <section class="main-layout full wap-hero-wrapper" :class="cmp.classes" :style="cmp.style">

        <section class="wap-hero " :style="getCmpStyle" :class="cmp.classes">

            <h1 v-if="cmp.info.heading" :style="cmp.info.heading?.style" > {{ cmp.info.heading.txt }}</h1>
            <p v-if="cmp.info.subHeading" :style="cmp.info.subHeading?.style"  >{{ cmp.info.subHeading.txt }}</p>
            <button v-if="cmp.info.btns" v-for="btn in cmp.info.btns" :style="cmp.btns.subHeading?.style">
                {{ btn.txt }}
            </button>

            <img v-for="img in cmp.info.imgs" :src="img.src" alt="" class="wap-img" :class="img.classes"
                :style="img.style">


        </section>
    </section>


</template>
<script>
import { utilService } from '../../services/util.service';

export default {
    name: 'dynamic-hero-cmp',
    props: { cmp: Object },
    components: {},
    data() {
        return {};
    },
    computed: {
        getCmpStyle() {
            const style = utilService.copy(this.cmp.style)
            delete style['background-image']
            return style
        }
    }

};
</script>
<style>

</style>
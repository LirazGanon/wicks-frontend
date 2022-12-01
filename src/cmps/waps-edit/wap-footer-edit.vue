<template>
    <section class="main-layout full" :style="cmp.style">
        <section class="wap-footer" :class="cmp.classes">

            <div v-for="txts in cmp.info.details">
                <p v-for="txt in txts.texts"  contenteditable="true">{{ txt }}
                </p>
            </div>
            <p v-if="(cmp.info.logo.type === 'txt')" class="logo"  contenteditable="true">{{ cmp.info.logo.txt }}</p>
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
    methods: {},
    computed: {},
    unmounted() { },
};
</script>
<style>

</style>
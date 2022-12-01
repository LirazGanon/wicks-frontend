<template>
    <nav class="wap-nav flex">
        <!-- <pre>

         {{nav}}
     </pre>  -->

        <a href="#" v-for="l in nav.info.links"> <span v-if="(l.type !== 'button')">
                {{ l.txt }}
            </span>
            <button v-else>
                {{l.txt}}
            </button>
        </a>



    </nav>

</template>
<script>
export default {
    name: 'dynamic-nav-cmp',
    props: { nav: Object },
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
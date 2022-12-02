<template>
    <section class="color-picker">
        <div class="color-picker-item" v-for="(item, index) in colors" :key="index">
            <div :style="{backgroundColor:item}">{{ item }}</div>
        </div>

    </section>

</template>
<script>
export default {
    name: 'color-picker',
    props: {
     
    },
    components: {},
    data() {
        return {
            colors: ['#6D67E4', '#937DC2', '#6ECCAF', '#F2DEBA', '#F79F79', '#F7D08A']

        }
    },
    created() {
    },
    methods: {
    },
    computed: {}
}
</script>
<style>

</style>
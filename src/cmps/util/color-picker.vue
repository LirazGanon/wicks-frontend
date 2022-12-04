<template>
    <section class="color-picker">
        <div class="demo-color-block">
            <el-color-picker v-model="color1" show-alpha @change="$emit('setColor', color1)" />
        </div>
        <div class="color-picker-item" v-for="(item, index) in colors" :key="index">
            <div :style="{ backgroundColor: item }" @click="$emit('setColor', item)"></div>
        </div>

    </section>

</template>
<script>

import { ref } from 'vue'

export default {
    name: 'color-picker',
    props: {

    },
    components: {},
    data() {
        return {
            colors: ['#E3F09B','#9FBBCC', '#6D67E4', '#937DC2', '#F79F79', '#CF9893', '#F2DEBA', 
              '#739E82','#46C2CB','#FB2576','#65647C','#285430','#DC3535',
            ],
            color1: ref('#346')

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
.demo-color-block .el-color-picker__trigger {
    padding: 0;
    border-radius: 50%;
    border: none;
    height: 35px;
    width: 35px;
}

.demo-color-block .el-icon svg {
    scale: 1.7;
}

.demo-color-block .el-color-picker__color-inner,
.el-color-picker__color.is-alpha {
    border-radius: 50%;
}

.demo-color-block .el-color-picker__color {
    border: none;
}

.demo-color-block {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
}
</style>
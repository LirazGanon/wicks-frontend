<template>
    <div class="slider">

        <span>10</span>


    </div>

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
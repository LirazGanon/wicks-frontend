<template>
  <el-select v-model="value" @change="$emit('setFont', value)" clearable placeholder="Select">
    <el-option v-for="item in options" :key="item.value" :label="item.label"
     :value="item.value" :style="{'fontFamily':item.value}" />
  </el-select>
</template>
  
<script>
import { ref } from 'vue'
export default {
  data() {
    return {
      value: ref(''),
      options: [
        {
          value: 'openSans',
          label: 'Open-Sans',
        },
        {
          value: 'comfortaa',
          label: 'Comfortaa',
        },
        {
          value: 'workSans',
          label: 'Work-Sans',
        },
        {
          value: 'montserrat',
          label: 'Montserrat',
        },
        {
          value: 'nerkoOne',
          label: 'Nerko-One',
        },
        {
          value: 'oswald',
          label: 'Oswald',
        },
        {
          value: 'pacifico',
          label: 'Pacifico',
        },
        {
          value: 'raleway',
          label: 'Raleway',
        },
      ]
    }
  },



}
</script>
  
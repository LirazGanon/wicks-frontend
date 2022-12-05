<template>
    <div class="slider-container">
        <label>
            <span>{{ value }}</span>
            <input type="range" v-model="value" min="0" max="100" class="slider">
        </label>




    </div>

</template>
<script>

import { ref } from 'vue'

export default {
    name: 'color-picker',
    props: {
        change: Object
    },
    components: {

    },
    data() {
        return {
            value: 50
        }
    },
    created() {
    },
    methods: {
    },
    computed: {},
    watch: {
        change: function () {
            this.value = 50
        }
    }
}
</script>


<style>
.slider {
    background: #555;
}

/* input */
</style>

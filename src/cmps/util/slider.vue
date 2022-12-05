<template>
    <div class="slider-container">
 

        <input type="range" v-model="value" min="0" max="100" @change="$emit('changed',this.value)">
        <div id="h4-container">
            <div id="h4-subcontainer">
                <h4 :style="{ left: value + '%' }">{{ value }}<span></span></h4>
            </div>
        </div>


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
    computed: {
        getLocation() {
            return { transformX: this.value + '%' }
        }
    },
    watch: {
        change: function () {
            this.value = 50
        }
    }
}
</script>


<style>
html input[type=range] {
    outline: 0;
    border: 0;
    border-radius: 500px;
    width: 400px;
    max-width: 100%;
    margin: 24px 0 16px;
    transition: box-shadow 0.2s ease-in-out;
}

@media screen and (-webkit-min-device-pixel-ratio: 0) {
    html input[type=range] {
        height: 20px;
        -webkit-appearance: none;
        background-color: #ddd;
    }

    html input[type=range]::-webkit-slider-runnable-track {
        height: 20px;
        -webkit-appearance: none;
        color: #444;
        -webkit-transition: box-shadow 0.2s ease-in-out;
        transition: box-shadow 0.2s ease-in-out;
    }

    html input[type=range]::-webkit-slider-thumb {
        width: 40px;
        -webkit-appearance: none;
        height: 40px;
        cursor: ew-resize;
        box-shadow:  inset 0 0 0 40px blueviolet;
        border-radius: 50%;
        -webkit-transition: box-shadow 0.2s ease-in-out;
        transition: box-shadow 0.2s ease-in-out;
        position: relative;
        transform: translateY(-20%);
    }

    html input[type=range]:active::-webkit-slider-thumb {
        background: #fefeff;
        box-shadow:  inset 0 0 0 3px blueviolet;
    }
}

html input[type=range]::-moz-range-progress
 {
    background-color: blueviolet;
}

html input[type=range]::-moz-range-track {
    background-color: #9a905d;
}

html input[type=range]::-ms-fill-lower {
    background-color: blueviolet;
}

html input[type=range]::-ms-fill-upper {
    background-color: #9a905d;
}

#h4-container {
    width: 400px;
    max-width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
    position: relative;
}

#h4-container #h4-subcontainer {
    width: 100%;
    position: relative;
}

#h4-container #h4-subcontainer h4 {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: -100px;
    width: 40px;
    height: 40px;
    color: #fff !important;
    font-size: 12px;
    transform-origin: center -10px;
    transform: translateX(-50%);
    transition: margin-top 0.15s ease-in-out, opacity 0.15s ease-in-out;
}

#h4-container #h4-subcontainer h4 span {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    background-color: blueviolet;
    border-radius:  50%  50% 0 50%;
    transform: rotate(45deg);
    z-index: -1;
}

input:not(:active)+#h4-container h4 {
    opacity: 0;
    margin-top: -50px;
    pointer-events: none;
}
</style>
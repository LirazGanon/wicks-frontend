<template>
    <div class="slider-container">


        <input type="range" v-model="value" min="0" max="100" @change="$emit('changed', this.value)">
        <div id="h4-container">
            <div id="h4-subcontainer">
                <h4 :style="{ left: left }">{{ value }}<span></span></h4>
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
        },
        left() {
            const pres = +this.value / 50
            const value = +this.value
            // const left = this.value + pres
            return value > 50 ? value + pres + '%' : value - pres + '%'
         
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
    width: 150px;
    max-width: 100%;
    transition: box-shadow 0.2s ease-in-out;
}

@media screen and (-webkit-min-device-pixel-ratio: 0) {
    html input[type=range] {
        height: 8px;
        -webkit-appearance: none;
        background-color: #ddd;
    }

    html input[type=range]::-webkit-slider-runnable-track {
        height: 8px;
        -webkit-appearance: none;
        color: #444;
        -webkit-transition: box-shadow 0.2s ease-in-out;
        transition: box-shadow 0.2s ease-in-out;
    }

    html input[type=range]::-webkit-slider-thumb {
        width: 25px;
        -webkit-appearance: none;
        height: 25px;
        cursor: ew-resize;
        box-shadow: inset 0 0 0 40px blueviolet;
        border-radius: 50%;
        -webkit-transition: box-shadow 0.2s ease-in-out;
        transition: box-shadow 0.2s ease-in-out;
        position: relative;
        transform: translateY(-30%);
    }

    html input[type=range]:active::-webkit-slider-thumb {
        background: #fefeff;
        box-shadow: inset 0 0 0 3px blueviolet;
    }
}

html input[type=range]::-moz-range-progress {
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
    /* width: 150px; */
    max-width: 100%;
    padding: 0 20px;
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
    top: -60px;
    width: 36px;
    height: 36px;
    color: #fff !important;
    font-size: 12px;
    transform-origin: center -10px;
    transform: translateX(-50%);
    transition: margin-bottom 0.15s ease-in-out, opacity 0.15s ease-in-out;
}

#h4-container #h4-subcontainer h4 span {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    background-color: blueviolet;
    border-radius: 50% 50% 0 50%;
    transform: rotate(45deg);
    z-index: -1;
}

input:not(:active)+#h4-container h4 {
    opacity: 0;
    margin-bottom: -50px;
    pointer-events: none;
}
</style>
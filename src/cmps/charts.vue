<template>
    <section class="chart-line">

        <h3>User Interactions</h3>
        <LineChart :chartData="data" :options="options" />
    </section>
</template>
  
<script>
import { LineChart } from 'vue-chart-3'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

export default {
    name: 'awesome-chart',
    props: {
        data: Object,
    },
    components: { LineChart },
    data() {
        return {
            options: {
                plugins: {
                    legend: {
                        display: false,
                    },
                },
            },
        }
    },
}
</script>
  
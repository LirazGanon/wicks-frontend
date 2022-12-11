<template>
    <section class="chart-line">
        <div class="interactions-stats">

            <div>
                <span>Visits</span>

                <h3>
                    {{ data.datasets[0].data[data.datasets[0].data.length - 1] }}
                </h3>
            </div>
            <div>
                <span>Leads</span>
                <h3>
                    {{ data.datasets[1].data[data.datasets[0].data.length - 1] }}
                </h3>
            </div>
            <div>
                <span>Convertion rate</span>
                <h3>
                <!-- {{ (data.datasets[0].data[data.datasets[0].data.length - 1] /
                        data.datasets[1].data[data.datasets[0].data.length - 1]).toFixed(2)
                }}% -->
                0%
                </h3>
            </div>
        </div>

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
    computed: {

    }
}
</script>
  
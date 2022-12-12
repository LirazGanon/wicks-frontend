<template>
    <section class="chart-line">
        <div class="interactions-stats">

            <div>
                <span>Visits</span>

                <h3>
                    {{ testData.datasets[0].data[testData.datasets[0].data.length - 1] }}
                </h3>
            </div>
            <div>
                <span>Leads</span>
                <h3>
                    {{ testData.datasets[1].data[testData.datasets[0].data.length - 1] }}
                </h3>
            </div>
            <div>
                <span>Convertion rate</span>
                <h3>
                    {{ (testData.datasets[0].data[testData.datasets[0].data.length - 1] /
                            testData.datasets[1].data[testData.datasets[0].data.length - 1]).toFixed(2) || 0
                    }}%

                </h3>
            </div>
        </div>

        <LineChart :chartData="testData" :options="options" />
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
            testData: {
                labels: ['August', 'September', 'October', 'November', 'December'],
                datasets: [
                    {
                        label: 'Line  Dataset',
                        data: [30, 40, 60, 70, 40],
                        backgroundColor: [
                            '#c78afb',
                            '#873dc8',
                            '#c78afb',
                            '#873dc8',
                            ,
                        ],
                        tension: .3,
                    },
                    {
                        label: 'Bar Dataset',
                        data: [30, 40, 80, 70, 40],
                        backgroundColor: [
                            '#c78afb',
                            '#873dc8',
                            '#c78afb',
                            '#873dc8',
                            ,
                        ],
                        tension: .3,
                    },
                ],
            },

        }
    },
    computed: {

    }
}
</script>
  
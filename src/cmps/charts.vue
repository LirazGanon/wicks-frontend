<template>
    <section class="chart-line">
        <div class="interactions-stats">
            <!-- <pre>{{ info }}</pre> -->
            <div>
                <span>Visits</span>

                <h3>
                    {{ testData.datasets[0].data[testData.datasets[0].data.length - 1].toLocaleString()  }}
                </h3>
            </div>
            <div>
                <span>Leads</span>
                <h3>
                    {{ testData.datasets[1].data[testData.datasets[0].data.length - 1]}}
                </h3>
            </div>
            <div>
                <span>Conversion rate</span>
                <h3>
                    {{
                            ((testData.datasets[1].data[testData.datasets[0].data.length - 1] /
                                testData.datasets[0].data[testData.datasets[0].data.length - 1]) * 100).toFixed(0)  || 0
                    
                    
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
        info: Object,
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
                labels: ['July','August', 'September', 'October', 'November', 'December'],
                datasets: [
                    {
                        label: 'Visits',
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
                        label: 'Leads',
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
    created() {
        this.setData()

    },
    methods: {
        setData() {
            const visits = this.info.map(x => x.visits)
            const signups = this.info.map(x => x.signups)
            this.testData.datasets[0].data = visits
            this.testData.datasets[1].data = signups
        }
    },
    watch: {
        info() {
            this.setData()
        }
    }
}
</script>
  
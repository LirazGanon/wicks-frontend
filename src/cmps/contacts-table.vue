<template>

    <section class="wap-table">
        <h3>Contacts</h3>
        <el-table :data="table">
            <el-table-column prop="at" label="Date" />
            <el-table-column prop="name" label="Name" />
            <el-table-column prop="email" label="Email" />
            <el-table-column prop="msg" label="Order" />
        </el-table>

    </section>

</template>
<script>
import { utilService } from '../services/util.service';

export default {
    name: 'table',
    props: { info: Array },
    components: {},
    data() {
        return {};
    },
    created() { },
    methods: {},
    computed: {
        table() {
            let table = this.info
            return table.map(row => {
                row = utilService.copy(row)
                const date = new Intl.DateTimeFormat('en-US').format(row.at)
                if (!row.name) row.name = 'GuyKing'
                row.at = date
                return row
            })

        }
    },
    unmounted() { },
};
</script>
<style>

</style>
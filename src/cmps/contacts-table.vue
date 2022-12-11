<template>

    <section class="wap-table">
        <h3>Leads</h3>
        <el-table :data="table" :default-sort="{ prop: 'at', order: 'descending' }" style="width: 100%"
            :row-class-name="tableRowClassName">


            <el-table-column type="expand">
                <template #default="prop">
                    <div m="4" class="inner-table">
                        <h3>Comments:</h3>
                        <p>{{ prop.row.msg }}</p>

                    </div>
                </template>
            </el-table-column>


            <el-table-column prop="at" label="Date" sortable />
            <el-table-column prop="name" label="Name" sortable />
            <el-table-column prop="email" label="Email" sortable />
            <!-- <el-table-column prop="msg" label="Comments " /> -->
        </el-table>

        <!-- <pre>{{ info[0].at }}</pre> -->

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
    methods: {
        tableRowClassName({ rowIndex }) {
            if (rowIndex % 2 === 0) return "dark"
        }
    },
    computed: {
        table() {
            let table = this.info
            return table.map(row => {
                row = utilService.copy(row)
                const date = new Intl.DateTimeFormat('en-US').format(row.at)
                if (!row.name) row.name = ''
                row.at = date
                return row
            })

        }

    },
    unmounted() { },
};
</script>
<style>
.inner-table {
    padding-inline-start: 40px;
}

.inner-table h3 {
    margin-block: 10px;
    border-left: 4px solid #c78afb;
    padding-inline-start: 6px;
}

.dark {
    box-shadow: inset 0 0 510px #9992;
}

p {
    margin-block: 20px;
}
</style>
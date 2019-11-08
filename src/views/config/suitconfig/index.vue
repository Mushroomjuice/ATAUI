<template>
    <div>
        <el-row>
            <el-col :span="8">
                <el-button icon="el-icon-edit" type="primary">create</el-button>
                <el-button icon="el-icon-delete" type="danger">delete</el-button>
            </el-col>
            <!-- test suite 搜索开始 -->
            <el-col :span="4" :offset="12">
                <el-input clearable>
                <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </el-col>
        </el-row>
        <el-table>
            <el-table-column label="register_time">

            </el-table-column>
            <el-table-column label="register_time">

            </el-table-column>
            <el-table-column label="register_time">

            </el-table-column>
            <el-table-column label="register_time">

            </el-table-column>
            <el-table-column label="register_time">

            </el-table-column>
        </el-table>
        
    </div>
</template>

<script>
export default {
    name:'SuitConfig'
}
</script>
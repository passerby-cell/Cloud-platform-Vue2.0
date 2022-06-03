<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>我的作业</el-breadcrumb-item>
      <el-breadcrumb-item>标准作业</el-breadcrumb-item>
    </el-breadcrumb>

    <el-button style="margin-top:10px" type="primary" icon="el-icon-edit" size="small">新建作业</el-button>

    <el-table style="width: 100%;margin-top:10px" :data="job" :border="true" max-height="580">
      <el-table-column prop="name" label="任务名"></el-table-column>
      <el-table-column prop="startTime" label="开始时间" width="180"></el-table-column>
      <el-table-column prop="stopTime" label="结束时间" width="180"></el-table-column>
      <el-table-column prop="works" label="总任务数"></el-table-column>
      <el-table-column prop="isDone" label="运行完成数"></el-table-column>
      <el-table-column prop="inLine" label="排队中"></el-table-column>
      <el-table-column prop="CPU" label="cpu使用量"></el-table-column>
      <el-table-column prop="MEM" label="内存使用量"></el-table-column>
      <el-table-column prop="status" label="状态"></el-table-column>
      <el-table-column prop="update" label="操作" width="180">
        <template slot-scope="scope">
          <el-button size="mini" type="primary">暂停</el-button>
          <el-button size="mini" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-col style="text-align: center;">
      <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
    </el-col>
  </div>
</template>

<script>
export default {
  name: 'Images',
  data() {
    return {
      job: [],
    }
  },
  methods: {},
}
</script>

<style scoped>
</style>

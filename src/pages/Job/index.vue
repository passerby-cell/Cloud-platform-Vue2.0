<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>我的作业</el-breadcrumb-item>
      <el-breadcrumb-item>标准作业</el-breadcrumb-item>
    </el-breadcrumb>

    <el-button
      style="margin-top:10px;margin-left:10px"
      type="primary"
      icon="el-icon-edit"
      size="small"
    >新建作业</el-button>

    <el-table
      style="width: 100%;margin-top:10px;margin-left:10px"
      :data="job"
      :border="true"
      :row-class-name="tableRowClassName"
      :row-style="{height: '20px'}"
      max-height="580"
    >
      <el-table-column prop="name" label="任务名"></el-table-column>
      <el-table-column prop="startTime" label="开始时间" width="160"></el-table-column>
      <el-table-column prop="stopTime" label="结束时间" width="160"></el-table-column>
      <el-table-column prop="works" label="总任务数" sortable width="110"></el-table-column>
      <el-table-column prop="isDone" label="运行完成数" width="120" sortable></el-table-column>
      <el-table-column prop="inLine" label="排队中"></el-table-column>
      <el-table-column prop="CPU" label="cpu使用量" width="120" sortable></el-table-column>
      <el-table-column prop="MEM" label="内存使用量" width="120" sortable></el-table-column>
      <el-table-column prop="status" label="状态" sortable></el-table-column>
      <el-table-column prop="update" label="操作" width="160">
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
  name: 'Job',
  data() {
    return {
      job: [
        {
          name: '180',
          startTime: 'now',
          stopTime: 'tomorrow',
          works: '12',
          isDone: '10',
          inLine: '2',
          CPU: '80%',
          MEM: '80%',
          status: '执行中',
        },
        {
          name: '180',
          startTime: 'now',
          stopTime: 'tomorrow',
          works: '12',
          isDone: '10',
          inLine: '2',
          CPU: '80%',
          MEM: '80%',
          status: '执行中',
        },
        {
          name: '180',
          startTime: 'now',
          stopTime: 'tomorrow',
          works: '12',
          isDone: '10',
          inLine: '2',
          CPU: '20%',
          MEM: '20%',
          status: '执行中',
        },
        {
          name: '180',
          startTime: 'now',
          stopTime: 'tomorrow',
          works: '12',
          isDone: '10',
          inLine: '2',
          CPU: '80%',
          MEM: '80%',
          status: '已完成',
        },
        {
          name: '180',
          startTime: 'now',
          stopTime: 'tomorrow',
          works: '12',
          isDone: '10',
          inLine: '2',
          CPU: '80%',
          MEM: '80%',
          status: '执行中',
        },
        {
          name: '180',
          startTime: 'now',
          stopTime: 'tomorrow',
          works: '12',
          isDone: '10',
          inLine: '2',
          CPU: '50%',
          MEM: '50%',
          status: '已完成',
        },
      ],
    }
  },
  methods: {
    tableRowClassName({ rowIndex }) {
      if (this.job[rowIndex].status === '已完成') {
        return 'success-row'
      }
      if (
        parseInt(this.job[rowIndex].CPU.split('%')[0]) >= 60 ||
        parseInt(this.job[rowIndex].MEM.split('%')[0]) >= 60
      ) {
        return 'warning-row'
      }
      return ''
    },
  },
}
</script>

<style scoped>
@import './CSS/info.css';
.el-breadcrumb {
  margin-top: 10px;
  margin-left: 10px;
}
.el-table {
  font-style: initial;
}
</style>

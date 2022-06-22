<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>我的作业</el-breadcrumb-item>
      <el-breadcrumb-item>{{secondBread}}</el-breadcrumb-item>
    </el-breadcrumb>

    <el-button
      style="margin-top:10px;margin-left:10px"
      type="primary"
      icon="el-icon-edit"
      size="small"
      @click="goStandardJob"
    >新建作业</el-button>

    <el-table
      style="width: 100%;margin-top:10px;margin-left:10px"
      :data="joblist"
      :border="true"
      :row-class-name="tableRowClassName"
      :row-style="{height: '20px'}"
      max-height="580"
    >
      <el-table-column prop="jobname" label="任务名"></el-table-column>
      <el-table-column prop="starttime" label="开始时间" width="160"></el-table-column>
      <el-table-column prop="stoptime" label="结束时间" width="160"></el-table-column>
      <el-table-column prop="workcount" label="总任务数" sortable width="110"></el-table-column>
      <el-table-column prop="workdonecount" label="运行完成数" width="120" sortable></el-table-column>
      <el-table-column prop="workinlinecount" label="排队中" sortable></el-table-column>
      <el-table-column prop="cpucount" label="cpu使用量" width="120" sortable></el-table-column>
      <el-table-column prop="memcount" label="内存使用量" width="120" sortable></el-table-column>
      <el-table-column prop="status" label="状态" sortable></el-table-column>
      <el-table-column label="操作" width="160">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            v-if="scope.row.status!='已完成'&&scope.row.status!='排队中'"
          >暂停</el-button>
          <el-button size="mini" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-col style="text-align: center;">
      <el-pagination
        :background="true"
        :page-sizes="[1, 2, 3, 4, 5, 6, 7, 8]"
        :page-size="page"
        layout="prev, pager, next,sizes"
        :page-count="Number(totalpage)"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      ></el-pagination>
    </el-col>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Job',
  data() {
    return {
      secondBread: '标准作业',
      page: 8,
    }
  },
  computed: {
    ...mapState('Job', ['joblist', 'pagesize', 'pagenum', 'totalpage']),
  },
  methods: {
    handleSizeChange(val) {
      this.page = val
      this.$store.dispatch('Job/getJobList', {
        token: localStorage.getItem('token'),
        userid: localStorage.getItem('userid'),
        pagenum: val,
        pagesize: this.page,
      })
    },
    handleCurrentChange(val) {
      this.$store.dispatch('Job/getJobList', {
        token: localStorage.getItem('token'),
        userid: localStorage.getItem('userid'),
        pagenum: val,
        pagesize: this.page,
      })
    },
    tableRowClassName({ rowIndex }) {
      if (this.joblist[rowIndex].status === '已完成') {
        return 'success-row'
      }
      if (
        parseInt(this.joblist[rowIndex].cpucount.split('%')[0]) >= 60 ||
        parseInt(this.joblist[rowIndex].memcount.split('%')[0]) >= 60
      ) {
        return 'warning-row'
      }
      return ''
    },
    goStandardJob() {
      this.$router.push({ name: 'standardjob' })
    },
    getSecondBread(data) {
      this.secondBread = data
    },
  },
  mounted() {
    this.$store.dispatch('Job/getJobList', {
      token: localStorage.getItem('token'),
      userid: localStorage.getItem('userid'),
      pagenum: 1,
      pagesize: this.page,
    })
    this.$bus.$on('getSecondBread', this.getSecondBread)
  },
  beforeDestroy() {
    this.$bus.$off('getSecondBread')
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

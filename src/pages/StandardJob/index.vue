<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>我的作业</el-breadcrumb-item>
      <el-breadcrumb-item>标准作业</el-breadcrumb-item>
      <el-breadcrumb-item>新建作业</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="card-style" shadow="hover">
      <el-form label-position="right" label-width="100px">
        <el-row>
          <h3>
            <span style="color:#409EFF">|</span>&nbsp;作业属性
          </h3>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="作业名称">
              <el-col :span="18" :offset="1">
                <el-input size="small" placeholder="请输入作业名称" />
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="1">
            <el-form-item label="作业优先级">
              <el-col :span="18" :offset="1">
                <el-select size="small" placeholder="请选择作业的优先级" v-model="value">
                  <el-option label="高" value="1"></el-option>
                  <el-option label="中" value="2"></el-option>
                  <el-option label="低" value="3"></el-option>
                </el-select>
              </el-col>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="尝试重启次数">
              <el-col :span="18" :offset="1">
                <el-input placeholder="请输入重启次数" size="small"></el-input>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="1">
            <el-form-item label="所属集群">
              <el-col :span="18" :offset="1">
                <el-select v-model="value" size="small">
                  <el-option label="kubenates" value="kubenates"></el-option>
                  <el-option label="docker" value="docker"></el-option>
                </el-select>
              </el-col>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="并行运行">
              <el-col :span="18" :offset="1">
                <el-switch v-model="value"></el-switch>
              </el-col>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-row>
        <el-col :span="2">
          <h3 style="margin-top:8px">
            <span style="color:#409EFF;">|</span>&nbsp;任务属性
          </h3>
        </el-col>
        <el-col :span="1">
          <el-button type="primary" size="small">添加</el-button>
        </el-col>
      </el-row>
      <el-table
        style="width: 100%;margin-top:10px;margin-left:10px"
        :data="job"
        :border="true"
        :row-style="{height: '20px'}"
        max-height="300px"
      >
        <el-table-column prop="name" label="任务名称"></el-table-column>
        <el-table-column prop="works" label="实例个数" sortable></el-table-column>
        <el-table-column prop="miniWorks" label="实例最小个数" sortable></el-table-column>
        <el-table-column prop="CPUNum" label="CPU核心数(核)" width="120" sortable></el-table-column>
        <el-table-column prop="MEM" label="内存使用量(GB)" width="120" sortable></el-table-column>
        <el-table-column prop="status" label="状态" sortable></el-table-column>
        <el-table-column prop="update" label="操作" width="160">
          <template slot-scope="scope">
            <el-button size="mini" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'StandardJob',
  data() {
    return {
      value: '',
      job: [],
    }
  },
}
</script>

<style scoped>
.el-breadcrumb {
  margin-top: 10px;
  margin-left: 10px;
}
.el-table {
  font-style: initial;
}
.card-style {
  margin: 10px;
  height: 650px;
}
.el-row {
  margin-top: 10px;
}
.el-select {
  width: 440px;
}
</style>

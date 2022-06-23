<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>数据服务</el-breadcrumb-item>
      <el-breadcrumb-item>{{secondBread}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row>
      <el-button
        style="margin-top:10px;margin-left: 10px;"
        type="primary"
        icon="el-icon-check"
        size="small"
      >全选</el-button>
      <el-button
        style="margin-top:10px;margin-left: 10px;"
        type="primary"
        icon="el-icon-folder-add"
        size="small"
      >新建文件夹</el-button>
      <el-button
        style="margin-top:10px;margin-left: 10px;"
        type="primary"
        icon="el-icon-upload"
        size="small"
      >上传文件</el-button>
      <el-button
        style="margin-top:10px;margin-left: 10px;"
        type="primary"
        icon="el-icon-download"
        size="small"
      >下载文件</el-button>

      <el-button
        style="margin-top:10px;margin-left: 10px;"
        type="danger"
        icon="el-icon-delete"
        size="small"
      >删除选中</el-button>
    </el-row>
    <el-row>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="多选" width="80">
          <el-checkbox></el-checkbox>
        </el-table-column>
        <el-table-column prop="name" label="文件名">
          <template slot-scope="scope">
            <el-row>
              <el-col :span="1">
                <i class="el-icon-folder" v-if="!scope.row.isFile"></i>
                <i class="el-icon-document" v-if="scope.row.isFile"></i>
              </el-col>
              <el-col :span="22" :offset="1">
                <div @keydown.enter="updatename(scope.row)">
                  <el-input
                    v-focus
                    size="small"
                    v-model="scope.row.name"
                    v-if="scope.row.show"
                    placeholder="scope.row.name"
                    @keydown.enter="updatename(scope.row)"
                  ></el-input>
                </div>
                <span
                  v-show="!scope.row.show"
                  @click="scope.row.show = !scope.row.show"
                >{{scope.row.name}}</span>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="上传日期" width="300"></el-table-column>
        <el-table-column prop="size" label="大小"></el-table-column>
        <el-table-column label="操作" width="400">
          <template slot-scope="scope">
            <el-button
              style="margin-left: 10px;"
              type="primary"
              icon="el-icon-view"
              size="small"
              v-if="scope.row.isFile"
            >预览</el-button>
            <el-button
              style="margin-left: 10px;"
              type="success"
              icon="el-icon-folder-opened"
              size="small"
              v-if="!scope.row.isFile"
            >打开</el-button>
            <el-button
              style="margin-left: 10px;"
              type="danger"
              icon="el-icon-delete"
              size="small"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Data',
  data() {
    return {
      tableData: [
        {
          id: 1,
          date: '2016-05-02',
          name: '王小虎wwwwwwww问我',
          size: '20M',
          isFile: true,
          show: false,
        },
        {
          id: 2,
          date: '2016-05-04',
          name: '王小虎',
          size: '20M',
          isFile: true,
          show: false,
        },
        {
          id: 3,
          date: '2016-05-01',
          name: '王小虎',
          size: '20M',
          isFile: false,
          show: false,
        },
        {
          id: 4,
          date: '2016-05-03',
          name: '王小虎',
          size: '20M',
          isFile: true,
          show: false,
        },
      ],
      secondBread: '结果集',
    }
  },
  directives: {
    //注册一个局部的自定义指令 v-focus
    focus: {
      // 指令的定义
      inserted: function (el) {
        // 聚焦元素
        el.querySelector('input').focus()
      },
    },
  },
  methods: {
    updatename(row) {
      row.show = !row.show
    },
  },
}
</script>

<style scoped>
.el-breadcrumb {
  margin-top: 10px;
  margin-left: 10px;
}
</style>

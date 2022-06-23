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
        icon="el-icon-d-arrow-left"
        size="small"
        @click="goBack"
      >返回</el-button>
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
      <el-table
        ref="table"
        :data="filelist"
        style="width: 100%"
        max-height="580px"
        @select-all="selectTableAll"
        @select="selectFile"
      >
        <el-table-column width="80" type="selection">
          <!-- <template slot-scope="scope">
            <el-checkbox @change="selectFile(scope.row)"></el-checkbox>
          </template>-->
        </el-table-column>
        <el-table-column prop="name" label="文件名">
          <template slot-scope="scope">
            <el-row>
              <el-col :span="1">
                <i class="el-icon-folder" v-if="!(scope.row.isfile==1)"></i>
                <i class="el-icon-document" v-if="scope.row.isfile==1"></i>
              </el-col>
              <el-col :span="22" :offset="1">
                <el-input
                  v-focus
                  size="small"
                  v-model="scope.row.name"
                  v-if="!Boolean(scope.row.isshow)"
                  placeholder="scope.row.name"
                  @blur="updatename(scope.row)"
                ></el-input>
                <span
                  v-show="Boolean(scope.row.isshow)"
                  @click="scope.row.isshow = !Boolean(scope.row.isshow)"
                >{{scope.row.name}}</span>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column prop="uploaddate" label="上传日期" width="300"></el-table-column>
        <el-table-column prop="size" label="大小"></el-table-column>
        <el-table-column label="操作" width="400">
          <template slot-scope="scope">
            <el-button
              style="margin-left: 10px;"
              type="primary"
              icon="el-icon-view"
              size="small"
              v-if="scope.row.isfile==1"
            >预览</el-button>
            <el-button
              style="margin-left: 10px;"
              type="warning"
              icon="el-icon-download"
              size="small"
              v-if="scope.row.isfile==1"
            >下载</el-button>
            <el-button
              style="margin-left: 10px;"
              type="success"
              icon="el-icon-folder-opened"
              size="small"
              v-if="!(scope.row.isfile==1)"
              @click="openDir(scope.row)"
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
  name: 'Data',
  data() {
    return {
      secondBread: '结果集',
      page: 8,

      //路径
      path: [],
      idpath: [],
      //选中的文件名
      checkedfile: [],
      //选中的文件id
      checkedfileid: [],
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
  computed: {
    ...mapState('File', ['filelist', 'pagesize', 'pagenum', 'totalpage']),
  },
  methods: {
    selectTableAll() {
      if (this.checkedfile.length == this.filelist.length) {
        this.checkedfile = []
        this.checkedfileid = []
      } else {
        this.filelist.forEach((item) => {
          this.checkedfileid.push(item.id)
          this.checkedfile.push(item.name)
        })
      }
    },
    selectFile(selection, row) {
      if (this.checkedfileid.includes(row.id)) {
        this.checkedfileid.forEach(function (item, index, arr) {
          if (item == row.id) {
            arr.splice(index, 1)
          }
        })
        this.checkedfile.forEach(function (item, index, arr) {
          if (item == row.name) {
            arr.splice(index, 1)
          }
        })
      } else {
        this.checkedfile.push(row.name)
        this.checkedfileid.push(row.id)
      }
      if (this.checkedfileid.length == this.filelist.length) {
        this.checkedall = true
      } else {
        this.checkedall = false
      }
    },
    goBack() {
      this.updateFileList(1, this.idpath[this.idpath.length - 1])
      this.idpath.pop()
      this.path.pop()
    },
    openDir(row) {
      this.path.push(row.name)
      this.idpath.push(row.catalogueid)
      this.updateFileList(1, row.id)
    },
    updateFileList(val, dirid) {
      this.$store.dispatch('File/getFileList', {
        token: localStorage.getItem('token'),
        userid: localStorage.getItem('userid'),
        parentdirid: dirid,
        pagenum: val,
        pagesize: this.page,
      })
    },
    updatename(row) {
      row.isshow = !Boolean(row.isshow)
    },
    handleCurrentChange(val) {
      this.updateFileList(val, localStorage.getItem('userid'))
    },
    handleSizeChange(val) {
      this.page = val
      this.updateFileList(1, localStorage.getItem('userid'))
    },
  },
  mounted() {
    this.updateFileList(1, localStorage.getItem('userid'))
  },
}
</script>

<style>
.el-breadcrumb {
  margin-top: 10px;
  margin-left: 10px;
}
</style>

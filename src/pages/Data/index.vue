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
        @click="fileDialogVisible = true"
      >新建文件夹</el-button>
      <el-dialog
        title="新建文件夹"
        :visible.sync="fileDialogVisible"
        width="30%"
        :before-close="handleClose"
      >
        <el-input placeholder="请输入新建的文件名" size="small" v-model="newDirName"></el-input>
        <span slot="footer" class="dialog-footer">
          <el-button @click="fileDialogVisible = false" size="small">取 消</el-button>
          <el-button type="primary" @click="newDir" size="small">确 定</el-button>
        </span>
      </el-dialog>
      <el-dropdown @command="handleUpload" style="margin-top:10px;margin-left: 10px;">
        <el-button type="primary" size="small" icon="el-icon-upload">
          上传
          <i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="uploadFile">上传文件</el-dropdown-item>
          <el-dropdown-item command="uploadFiles">上传文件夹</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-dialog
        title="上传"
        :visible.sync="uploadDialogVisible"
        width="433px"
        :before-close="handleClose"
      >
        <el-upload
          style="margin-left:15px;"
          drag
          action
          :http-request="uploadFile"
          multiple
          :auto-upload="false"
          ref="upload"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            将文件拖到此处，或
            <em>点击上传</em>
          </div>
          <div class="el-upload__tip" slot="tip"></div>
        </el-upload>
        <span slot="footer" class="dialog-footer">
          <el-button @click="uploadDialogVisible = false" size="small">取 消</el-button>
          <el-button type="primary" size="small" @click="submitUpload">上 传</el-button>
        </span>
      </el-dialog>
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
        <el-table-column prop="size" label="大小(MB)"></el-table-column>
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
import { reqMKDir, reqUploadFile } from '@/api'
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
      // 新建文件夹的对话框
      fileDialogVisible: false,
      // 上传文件对话框
      uploadDialogVisible: false,
      // 新建文件夹的名称
      newDirName: '',
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
    async uploadFile(files) {
      let dirpath = ''
      this.path.forEach((item) => {
        dirpath = dirpath + '/' + item
      })
      let parentdirid = this.idpath[this.idpath.length - 1]

      const formData = new FormData()
      formData.append('file', files.file)
      let result = await reqUploadFile(
        localStorage.getItem('token'),
        localStorage.getItem('userid'),
        dirpath,
        parentdirid,
        formData
      )
      if (result.code == '200') {
        this.updateFileList(this.pagenum, parentdirid)
      } else {
        this.$message.error('上传失败')
      }
    },

    submitUpload() {
      this.$refs.upload.submit()
    },
    handleUpload(command) {
      this.uploadDialogVisible = true
      if (command == 'uploadFile') {
        this.$nextTick(() => {
          this.$refs.upload.$children[0].$refs.input.webkitdirectory = false
        })
      } else {
        this.$nextTick(() => {
          this.$refs.upload.$children[0].$refs.input.webkitdirectory = true
        })
      }
    },
    async newDir() {
      let dirpath = ''
      this.path.forEach((item) => {
        dirpath = dirpath + '/' + item
      })
      let parentdirid = this.idpath[this.idpath.length - 1]
      let result = await reqMKDir(
        localStorage.getItem('token'),
        localStorage.getItem('userid'),
        this.newDirName,
        dirpath,
        parentdirid
      )
      if (result.code == '200') {
        this.$message({
          type: 'success',
          message: '新建成功',
        })
        this.updateFileList(this.pagenum, parentdirid)
      } else {
        this.$message.error('新建失败:文件名重复!')
      }
      this.fileDialogVisible = false
      this.newDirName = ''
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then((_) => {
          done()
        })
        .catch((_) => {})
    },
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
      this.updateFileList(1, this.idpath[this.idpath.length - 2])
      this.idpath.pop()
      this.path.pop()
    },
    openDir(row) {
      this.path.push(row.name)
      this.idpath.push(row.id)
      console.log(this.path)
      console.log(this.idpath)
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
      let parentdirid = this.idpath[this.idpath.length - 1]
      this.updateFileList(val, parentdirid)
    },
    handleSizeChange(val) {
      this.page = val
      let parentdirid = this.idpath[this.idpath.length - 1]
      this.updateFileList(1, parentdirid)
    },
  },
  mounted() {
    this.updateFileList(1, localStorage.getItem('userid'))
    this.path.push(localStorage.getItem('userid'))
    this.idpath.push(localStorage.getItem('userid'))
  },
}
</script>

<style>
.el-breadcrumb {
  margin-top: 10px;
  margin-left: 10px;
}
</style>

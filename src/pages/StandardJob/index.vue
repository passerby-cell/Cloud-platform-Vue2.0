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
          <el-button type="primary" size="small" @click="dialogFormVisible = true">添加</el-button>
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
    <el-dialog title="添加标准作业任务" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="任务名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" placeholder="请输入任务名称"></el-input>
        </el-form-item>
        <el-form-item label="当前状态" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择当前任务状态" style="width:100%">
            <el-option label="运行完成" value="success"></el-option>
            <el-option label="运行失败" value="failure"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="需变更状态" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择变更任务状态" style="width:100%">
            <el-option label="运行完成" value="success"></el-option>
            <el-option label="运行失败" value="failure"></el-option>
          </el-select>
        </el-form-item>
        <el-row>
          <el-col :span="11">
            <el-form-item label="实例个数" :label-width="formLabelWidth">
              <el-input-number v-model="number"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="2">
            <el-form-item label="最小实例个数" :label-width="formLabelWidth">
              <el-input-number v-model="number"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="CPU" :label-width="formLabelWidth">
              <el-input-number v-model="number"></el-input-number>
              <span style="font-size:16px;margin-left: 10px;">单位(核)</span>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="2">
            <el-form-item label="CPU限制" :label-width="formLabelWidth">
              <el-input-number v-model="number"></el-input-number>
              <span style="font-size:16px;margin-left: 10px;">单位(核)</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="内存" :label-width="formLabelWidth">
              <el-input-number v-model="number"></el-input-number>
              <span style="font-size:16px;margin-left: 10px;">单位(GB)</span>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="2">
            <el-form-item label="内存限制" :label-width="formLabelWidth">
              <el-input-number v-model="number"></el-input-number>
              <span style="font-size:16px;margin-left: 10px;">单位(GB)</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="GPU算力" :label-width="formLabelWidth">
          <el-input v-model="form.computingPower" style="width: 400px;"></el-input>
          <span style="font-size:16px;margin-left: 10px;">(%)</span>
          <el-tooltip class="item" effect="dark" placement="top">
            <div slot="content">
              <p>1、输入1-100内的整数，例如50，是指将50%的cuda core分配给该服务。</p>
              <p>2、输入大于100的整数，只能是100的倍数，如200，是指将2张GPU卡都分给该服务。</p>
              <p>3、如果输入大于等于100的整数，GPU显存不用在填写，默认使用GPU的全部显存。</p>
              <p>4、如果值为空或0时，默认不使用GPU算力"</p>
            </div>
            <i class="el-icon-question" style="color: #409EFF;margin-left: 10px;cursor: pointer;"></i>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="GPU显存" :label-width="formLabelWidth">
          <el-col :span="12">
            <el-slider v-model="form.GPUmemory" max="256"></el-slider>
          </el-col>
          <span style="font-size:16px;margin-left: 10px;">{{form.GPUmemory*0.25}}Gi</span>
          <el-tooltip class="item" effect="dark" placement="top">
            <div slot="content">
              <p>注：Gi为单位时，拖动一格显示1，为0.25Gi，拖动2格显示2，为0.5Gi，以此类推；最大能拖动256格显示256，为64Gi</p>
            </div>
            <i class="el-icon-question" style="color: #409EFF;margin-left: 10px;cursor: pointer;"></i>
          </el-tooltip>
        </el-form-item>
        <el-form-item label="选择仓库" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择镜像仓库" style="width:100%">
            <el-option label="abcsys.cn" value="abcsys.cn"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择目录" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择镜像目录" style="width:100%">
            <el-option label="公共镜像目录" value="success"></el-option>
            <el-option label="私有镜像目录" value="failure"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择镜像" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择镜像" style="width:100%">
            <el-option label="运行完成" value="success"></el-option>
            <el-option label="运行失败" value="failure"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择版本" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择镜像版本" style="width:100%">
            <el-option label="V1" value="V1"></el-option>
            <el-option label="V2" value="V2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="程序运行命令" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="工作目录" :label-width="formLabelWidth">
          <el-input
            v-model="form.name"
            autocomplete="off"
            placeholder="设置进入容器的目录,没有设置的情况下,使用镜像的工作目录,默认进入根目录"
          ></el-input>
        </el-form-item>
        <el-form-item label="高级配置" :label-width="formLabelWidth">
          <el-tabs v-model="activeName">
            <el-tab-pane label="端口" name="first">
              <el-card>
                <el-row>
                  <h3>
                    <span style="color:#409EFF">|</span>&nbsp;添加端口
                  </h3>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <el-input placeholder="端口"></el-input>
                  </el-col>
                  <el-col :span="6" :offset="1">
                    <el-select style="width:100%" v-model="form.portType">
                      <el-option label="TCP" value="TCP"></el-option>
                      <el-option label="UDP" value="UDP"></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="1" :offset="1">
                    <el-button type="primary" size="small">添加</el-button>
                  </el-col>
                </el-row>
                <el-row>
                  <h3>
                    <span style="color:#409EFF">|</span>&nbsp;管理变量
                  </h3>
                </el-row>
                <el-row>
                  <el-table border style="width: 100%">
                    <el-table-column label="名称"></el-table-column>
                    <el-table-column label="端口"></el-table-column>
                    <el-table-column label="协议"></el-table-column>
                    <el-table-column label="操作"></el-table-column>
                  </el-table>
                </el-row>
              </el-card>
            </el-tab-pane>
            <el-tab-pane label="环境变量" name="second">
              <el-card>
                <el-row>
                  <h3>
                    <span style="color:#409EFF">|</span>&nbsp;添加变量
                  </h3>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <el-input placeholder="Key"></el-input>
                  </el-col>
                  <el-col :span="6" :offset="1">
                    <el-input placeholder="Value"></el-input>
                  </el-col>
                  <el-col :span="1" :offset="1">
                    <el-button type="primary" size="small">添加</el-button>
                  </el-col>
                </el-row>
                <el-row>
                  <h3>
                    <span style="color:#409EFF">|</span>&nbsp;管理变量
                  </h3>
                </el-row>
                <el-row>
                  <el-table border style="width: 100%">
                    <el-table-column label="Key"></el-table-column>
                    <el-table-column label="Value"></el-table-column>
                    <el-table-column label="操作"></el-table-column>
                  </el-table>
                </el-row>
              </el-card>
            </el-tab-pane>
            <el-tab-pane label="存储变量" name="third">
              <el-card>
                <el-row>
                  <h3>
                    <span style="color:#409EFF">|</span>&nbsp;添加变量
                  </h3>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <el-input placeholder="Key"></el-input>
                  </el-col>
                  <el-col :span="6" :offset="1">
                    <el-input placeholder="Value"></el-input>
                  </el-col>
                  <el-col :span="1" :offset="1">
                    <el-button type="primary" size="small">添加</el-button>
                  </el-col>
                </el-row>
                <el-row>
                  <h3>
                    <span style="color:#409EFF">|</span>&nbsp;管理变量
                  </h3>
                </el-row>
                <el-row>
                  <el-table border style="width: 100%">
                    <el-table-column label="Key"></el-table-column>
                    <el-table-column label="Value"></el-table-column>
                    <el-table-column label="操作"></el-table-column>
                  </el-table>
                </el-row>
              </el-card>
            </el-tab-pane>
            <el-tab-pane label="调度管理" name="forth">
              <el-card>
                <el-row>
                  <h3>
                    <span style="color:#409EFF">|</span>&nbsp;添加变量
                  </h3>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <el-input placeholder="Key"></el-input>
                  </el-col>
                  <el-col :span="6" :offset="1">
                    <el-input placeholder="Value"></el-input>
                  </el-col>
                  <el-col :span="1" :offset="1">
                    <el-button type="primary" size="small">添加</el-button>
                  </el-col>
                </el-row>
                <el-row>
                  <h3>
                    <span style="color:#409EFF">|</span>&nbsp;管理变量
                  </h3>
                </el-row>
                <el-row>
                  <el-table border style="width: 100%">
                    <el-table-column label="Key"></el-table-column>
                    <el-table-column label="Value"></el-table-column>
                    <el-table-column label="操作"></el-table-column>
                  </el-table>
                </el-row>
              </el-card>
            </el-tab-pane>
            <el-tab-pane label="生命周期" name="fifth">
              <el-card>
                <el-row>
                  <h3>
                    <span style="color:#409EFF">|</span>&nbsp;添加卷
                  </h3>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <el-input placeholder="端口"></el-input>
                  </el-col>
                  <el-col :span="6" :offset="1">
                    <el-select style="width:100%" v-model="form.portType">
                      <el-option label="TCP" value="TCP"></el-option>
                      <el-option label="UDP" value="UDP"></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="1" :offset="1">
                    <el-button type="primary" size="small">添加</el-button>
                  </el-col>
                </el-row>
                <el-row>
                  <h3>
                    <span style="color:#409EFF">|</span>&nbsp;管理卷
                  </h3>
                </el-row>
                <el-row>
                  <el-table border style="width: 100%">
                    <el-table-column label="存储类型"></el-table-column>
                    <el-table-column label="特性"></el-table-column>
                    <el-table-column label="操作"></el-table-column>
                  </el-table>
                </el-row>
              </el-card>
            </el-tab-pane>
          </el-tabs>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="textarea"
            maxlength="30"
            show-word-limit
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'StandardJob',
  data() {
    return {
      activeName: 'first',
      value: '',
      job: [],
      dialogFormVisible: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
        computingPower: 0,
        GPUmemory: 0,
        portType: '',
      },
      formLabelWidth: '120px',
      number: 1,
      textarea: '',
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

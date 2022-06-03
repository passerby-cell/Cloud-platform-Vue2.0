<!-- 分页组件 需接收:
  pageNo:当前页码 
  total:总页数
  pageSize:每页显示条数
  continue:连续的页码数,一般为5、7 等奇数
  -->
<template>
  <div class="pagination" @click="changePage">
    <button :data-tag="-1">上一页</button>
    <button
      :data-tag="1"
      v-show="startNumberAndEndNumber.start-1>1||startNumberAndEndNumber.start==2"
    >1</button>
    <button v-show="1<startNumberAndEndNumber.start-1">...</button>
    <button
      v-for="(page,index) in startNumberAndEndNumber.end"
      :key="index"
      v-show="page>=startNumberAndEndNumber.start"
      :class="{active:page==pageNo}"
      :data-tag="page"
    >{{page}}</button>
    <button
      v-show="(totalPage>(startNumberAndEndNumber.end+1))||(startNumberAndEndNumber.end==(totalPage-2))"
    >...</button>
    <button :data-tag="totalPage" v-show="startNumberAndEndNumber.end+1<=totalPage">{{totalPage}}</button>
    <button :data-tag="0">下一页</button>
    <button style="margin-left: 30px">共 {{total}} 条</button>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: ['pageNo', 'total', 'pageSize', 'continue'],
  data() {
    return {}
  },
  computed: {
    totalPage() {
      return Math.ceil(this.total / this.pageSize)
    },
    startNumberAndEndNumber() {
      let start = 0
      let end = 0
      if (this.continue >= this.totalPage) {
        start = 1
        end = this.totalPage
      } else if (
        this.pageNo - parseInt(this.continue / 2) > 0 &&
        this.pageNo + parseInt(this.continue / 2) < this.totalPage
      ) {
        start = this.pageNo - parseInt(this.continue / 2)
        end = this.pageNo + parseInt(this.continue / 2)
      } else if (this.pageNo <= parseInt(this.continue / 2)) {
        start = 1
        end = this.continue
      } else if (this.pageNo + parseInt(this.continue / 2) >= this.totalPage) {
        start = this.totalPage - this.continue + 1
        end = this.totalPage
      }

      return { start, end }
    },
  },
  methods: {
    changePage(event) {
      let element = event.target
      let { tag } = element.dataset
      if (tag != null) {
        if (tag == -1) {
          if (this.pageNo == 1) {
            alert('当前已是第一页!')
          } else {
            this.$emit('changePage', this.pageNo - 1)
          }
        } else if (tag == 0) {
          if (this.pageNo == this.totalPage) {
            alert('当前已是最后一页!')
          } else {
            this.$emit('changePage', this.pageNo + 1)
          }
        } else {
          this.$emit('changePage', tag)
        }
      }
    },
  },
}
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>

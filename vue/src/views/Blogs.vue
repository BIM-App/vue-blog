<template>
  <div>
    <Header></Header>
    <!-- 时间线 -->
    <div class="block">
      <el-timeline>
        <el-timeline-item timestamp="2018/4/12" placement="top">
          <el-card>
            <h4>更新 Github 模板</h4>
            <p>王小虎 提交于 2018/4/12 20:46</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2018/4/3" placement="top">
          <el-card>
            <h4>更新 Github 模板</h4>
            <p>王小虎 提交于 2018/4/3 20:46</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
      <!-- 分页 -->
      <el-pagination class="pagination" background layout="prev, pager, next" :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header'
export default {
  name: 'Blogs',
  data() {
    return {
      blogs: {},
      currentPage: 1,
      total: 0,
      pageSize: 5
    }
  },
  components: { Header },
  methods: {
    page(currentPage) {
      const _this = this
      this.$axios.get('/blogs?currentPage=' + currentPage).then((res) => {
        console.log(res);
        _this.blogs = res.data.data.records
        _this.currentPage = res.data.data.current
        _this.total = res.data.data.total
        _this.pageSize = res.data.data.pageSize
      }).catch((err) => {
        console.log('page axios 请求错误');
      });
    }
  },
  created() {
    this.page(1)
  },
}
</script>

<style>
.pagination {
  margin: 0 auto;
  text-align: center;
}
</style>
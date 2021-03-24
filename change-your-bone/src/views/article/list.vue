<template>
  <section>
    <el-col
      :span="24"
      class="toolbar"
      style="padding-bottom: 0px;"
    >
      <el-form
        :inline="true"
      >
        <el-form-item>
          <el-button
            size="primary"
            @click="switch_to_note"
          >
            添加文章
          </el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <el-table
      v-loading="listLoading"
      :data="articleList"
      highlight-current-row
      element-loading-background="rgba(0, 0, 0, 0.1)"
      element-loading-text="数据正在加载中"
      element-loading-spinner="el-icon-loading"
      style="width: 100%;"
    >

      <el-table-column
        prop="article_id"
        label="ID"
        align="center"
      >
        <template slot-scope="scope">
          <div>
            <a href="javascript:" @click="goToFramework(scope.row.article_id)">{{scope.row.article_id}}</a>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="article_classify"
        label="分类"
      />
      <el-table-column
        prop="article_title"
        label="标题"
      />
      <el-table-column
        prop="article_account"
        label="作者"
      />
      <el-table-column
        prop="article_create_date"
        label="创建时间"
      />
      <el-table-column
        label="是否更新"
      >
        <template slot-scope="scope">
            <el-button v-if="!scope.row.removeButtonVisible" type="primary" size="small" @click="goToNote(scope.row.article_title,scope.row.article_classify)">更新</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--工具条-->
    <el-col
      :span="24"
      class="toolbar"
    >
      <el-pagination
        layout="total, prev, pager, next, jumper"
        :page-size="pageSizes"
        :total="total"
        style="float:right;"
        @current-change="handleCurrentChange"
      />
    </el-col>
  </section>
</template>

<script>
import { getArticleList } from '../../api/article'

export default {
  name: 'article-list',
  data () {
    return {
      articleList: [],
      total: 0,
      page: 1,
      pageSizes: 1,
      listLoading: false
    }
  },
  mounted () {
    this.showArticleList()
  },
  methods: {
    handleCurrentChange (val) {
      this.page = val
      this.showArticleList()
    },

    // 获取文章列表信息
    showArticleList () {
      var user
      let arr = document.cookie.split('; ')
      for (let i = 0; i < arr.length; i++) {
        let arr2 = arr[i].split('=')
        if (arr2[0] === 'C-username') {
          user = arr2[1]
        }
      }
      let params = {
        'token': window.sessionStorage.getItem('jwt').toString(),
        'account': user.toString()
      }
      getArticleList(params).then((res) => {
        this.articleList = res.data
        this.total = res.count
        this.pageSizes = this.articleList.length
        this.listLoading = false
      })
    },

    switch_to_note () {
      this.$router.push('/article/article-notes')
    },

    // eslint-disable-next-line camelcase
    goToFramework (article_id) {
      this.$router.push({
        name: '展示框架',
        params: {
          article_id: article_id.toString(),
          article_title: ''.toString()
        }
      })
    },
    // eslint-disable-next-line camelcase
    goToNote (article_title, article_classify) {
      this.$router.push({
        name: '小记',
        params: {
          article_title: article_title.toString(),
          article_classify: article_classify.toString()
        }
      })
    }
  }
}

</script>

<style scoped>

</style>

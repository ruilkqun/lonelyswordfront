<template>
  <mavon-editor :toolbars="toolbars" v-model="value" :codeStyle="prop.codeStyle" :ishljs="true" :subfield="prop.subfield" :defaultOpen="prop.defaultOpen" :toolbarsFlag="prop.toolbarsFlag" :editable="prop.editable" :scrollStyle="prop.scrollStyle" :boxShadow="prop.boxShadow" ref=md />
</template>

<script>
export default {
  name: 'markdown',
  data () {
    return {
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: false, // 全屏编辑
        readmodel: false, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: false, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: false // 预览
      },

      value: '# 风太师叔\n\n![fengtaishishu.jpeg](http://192.168.1.118:8088/images/6778573061923934209.png)}```'
    }
  },
  methods: {
  },
  computed: {
    prop () {
      return {
        // 单双栏模式
        subfield: false,
        // edit: 默认展示编辑区域, preview：默认展示预览区域
        defaultOpen: 'preview',
        editable: false,
        toolbarsFlag: false,
        scrollStyle: false,
        // 边框
        boxShadow: false,
        codeStyle: 'googlecode'// 主题
      }
    }
  }
}
</script>

<style scoped>
</style>

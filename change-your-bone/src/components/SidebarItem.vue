<template>
  <el-submenu v-if="!subroute.hidden && subroute.children && subroute.children.length > 0"
              :index="genPath(fatherpath, subroute.path)">
    <template slot="title">
<!--      <i class="el-icon-menu"></i>-->
      <svg-icon :icon-class=subroute.meta.icon.toString()></svg-icon>
      <span slot="title">
        &#12288;&#12288;
        {{ subroute.name }}</span>
    </template>

    <SidebarItem v-for="(submenu, subidx) in subroute.children"
    :subroute="submenu"
    :fatherpath="genPath(fatherpath, subroute.path)"
    :barIdx="subidx"
    :key="barIdx + '_' + subidx"/>
  </el-submenu>

  <el-menu-item style="font-weight: 400"
  v-else-if="!subroute.hidden"
  :index="genPath(fatherpath, subroute.path)">
    <svg-icon :icon-class=subroute.meta.icon.toString()></svg-icon>
    &#12288;&#12288;
    {{ subroute.name }}
  </el-menu-item>

  <el-menu-item style="font-weight: 400"
  v-else
  :index="genPath(fatherpath,subroute.path)">
    <svg-icon :icon-class=subroute.meta.icon.toString()></svg-icon>
    &#12288;&#12288;
    {{ subroute.name }}
  </el-menu-item>
</template>

<script>
export default {
  name: 'SidebarItem',
  props: {
    subroute: {
      type: Object
    },
    barIdx: {
      type: [String, Number]
    },
    fatherpath: {
      type: String
    }
  },

  computed: {
    defaultActive: function () {
      return this.$route.path
    }
  },

  methods: {
    genPath: function () {
      let arr = [ ...arguments ]
      let path = arr.map(v => {
        while (v[0] === '/') {
          v = v.substring(1)
        }
        while (v[-1] === '/') {
          v = v.substring(0, v.length)
        }
        return v
      }).join('/')
      path = path[0] === '/' ? path : '/' + path
      return path
    },
    handleOpen: function (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose: function (key, keyPath) {
      console.log(key, keyPath)
    }
  },

  mounted () {
    console.log('sidebar routes: ', this.router)
  }
}
</script>

<style scoped>

</style>

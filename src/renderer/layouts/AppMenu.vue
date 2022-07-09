<template>
  <el-menu
    @select="handleSelect">
    <template v-for="(menu, index) in routes">
      <el-menu-item v-if="!menu.meta.hidden" :key="index" :index="menu.name">
        <template v-if="menu.meta.icon">
          <i :class="'el-icon-' + menu.meta.icon"></i>
        </template>
        <span slot="title">{{ menu.meta.title }}</span>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
@Component({
  name: 'app-menu'
})
export default class extends Vue {
  routes: any[] = [];
  mounted () {
    this.getRoutes()
  }

  getRoutes () {
    this.routes = this.$router.options.routes[0].children
  }

  handleSelect (name: string) {
    this.$router.push({
      name: name
    })
  }
}
</script>

<template>
  <div class="fake-title-bar" :class="{ 'darwin': os === 'darwin' }">
    <div class="fake-title-bar__title">
      PicGo - {{ version }}
    </div>
    <div class="handle-bar" v-if="os !== 'darwin'">
      <i class="el-icon-minus" @click="minimizeWindow"></i>
      <i class="el-icon-circle-plus-outline" @click="openMiniWindow"></i>
      <i class="el-icon-close" @click="closeWindow"></i>
    </div>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
import {
  MINIMIZE_WINDOW,
  CLOSE_WINDOW
} from '~/universal/events/constants'
import pkg from 'root/package.json'
import mixin from '@/utils/mixin'
export default class extends Vue {
  os = ''
  version = process.env.NODE_ENV === 'production' ? pkg.version : 'Dev'
  @Component({
    name: 'app-title',
    mixins: [mixin]
  })

  created () {
    this.os = process.platform
  }

  minimizeWindow () {
    ipcRenderer.send(MINIMIZE_WINDOW)
  }

  closeWindow () {
    ipcRenderer.send(CLOSE_WINDOW)
  }

  openMiniWindow () {
    ipcRenderer.send('openMiniWindow')
  }
}
</script>

<style lang="stylus" scoped>
$darwinBg = transparentify(#172426, #000, 0.7)
$fakeTitleBarHeight = 42px
.fake-title-bar {
  -webkit-app-region: drag;
  height: $fakeTitleBarHeight;
  widht: 100%;
  text-align: center;
  color: #eee;
  font-size: 12px;
  line-height: $fakeTitleBarHeight;
  position: fixed;
  z-index: 100;
  &.darwin{
    background: transparent;
    background-image: linear-gradient( to right, transparent 0%, transparent 167px, $darwinBg 167px, $darwinBg 100%);
    .fake-title-bar__title {
      padding-left: 167px;
    }
  }
  .handle-bar {
    position: absolute;
    top: 2px;
    right: 4px;
    z-index: 10000;
    -webkit-app-region: no-drag;
    i {
      cursor: pointer;
      font-size: 16px;
      margin-left: 5px;
    }
    .el-icon-minus{
      &:hover{
        color: #409EFF;
      }
    }
    .el-icon-close{
      &:hover{
        color: #F15140;
      }
    }
    .el-icon-circle-plus-outline{
      &:hover{
        color: #69C282;
      }
    }
  }
}

</style>

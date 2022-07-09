<template>
  <div id="main-page">
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

    <div class="main-content">
      <div class="side-bar-menu">
        <app-menu></app-menu>
        <i class="el-icon-info setting-window" @click="openDialog"></i>
      </div>
      <div class="main-wrapper">
        <app-main></app-main>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import QrcodeVue from 'qrcode.vue'
import pkg from 'root/package.json'
import {
  ipcRenderer
} from 'electron'
import mixin from '@/utils/mixin'
import InputBoxDialog from '@/components/InputBoxDialog.vue'
import AppMenu from './AppMenu.vue'
import AppMain from './AppMain.vue'
import {
  MINIMIZE_WINDOW,
  CLOSE_WINDOW,
  SHOW_MAIN_PAGE_MENU
} from '~/universal/events/constants'
@Component({
  name: 'main-page',
  mixins: [mixin],
  components: {
    InputBoxDialog,
    QrcodeVue,
    AppMenu,
    AppMain
  }
})
export default class extends Vue {
  version = process.env.NODE_ENV === 'production' ? pkg.version : 'Dev'
  defaultActive = 'upload'
  os = ''
  picBed: IPicBedType[] = []
  created () {
    this.os = process.platform
  }

  minimizeWindow () {
    ipcRenderer.send(MINIMIZE_WINDOW)
  }

  closeWindow () {
    ipcRenderer.send(CLOSE_WINDOW)
  }

  openDialog () {
    ipcRenderer.send(SHOW_MAIN_PAGE_MENU)
  }

  openMiniWindow () {
    ipcRenderer.send('openMiniWindow')
  }

  beforeRouteEnter (to: any, next: any) {
    next((vm: this) => {
      vm.defaultActive = to.name
    })
  }
}
</script>
<style lang='stylus'>
$darwinBg = transparentify(#172426, #000, 0.7)
$fakeTitleBarHeight = 42px
#main-page
  height 100%
  overflow hidden
  .qrcode-dialog
    .qrcode-container
      display flex
      justify-content center
    .copy-picbed-config
      margin-left 10px
    .el-input__inner
      border-radius 14px
  .fake-title-bar
    -webkit-app-region drag
    height $fakeTitleBarHeight
    width 100%
    text-align center
    color #eee
    font-size 12px
    line-height $fakeTitleBarHeight
    position fixed
    z-index 100
    &.darwin
      background transparent
      background-image linear-gradient(
        to right,
        transparent 0%,
        transparent 167px,
        $darwinBg 167px,
        $darwinBg 100%
      )
      .fake-title-bar__title
        padding-left 167px
    .handle-bar
      position absolute
      top 2px
      right 4px
      z-index 10000
      -webkit-app-region no-drag
      i
        cursor pointer
        font-size 16px
        margin-left 5px
      .el-icon-minus
        &:hover
          color #409EFF
      .el-icon-close
        &:hover
          color #F15140
      .el-icon-circle-plus-outline
        &:hover
          color #69C282
  .main-wrapper
    flex 1
    overflow auto
    background #1e1e1e
    &.darwin
      background $darwinBg
  .side-bar-menu
    height calc(100vh - $fakeTitleBarHeight)
    overflow-x hidden
    overflow-y auto
    width 200px
    .el-icon-info.setting-window
      position fixed
      bottom 4px
      left 4px
      cursor poiter
      color #878d99
      transition .2s all ease-in-out
      &:hover
        color #409EFF
  .el-menu
    border-right none
    background transparent
    width 100%
    &-item
      color #eee
      position relative
      &:focus,
      &:hover
        color #fff
        // background transparent
        background #252525
      &.is-active
        color active-color = #409EFF
        // &:before
        //   content ''
        //   position absolute
        //   width 3px
        //   height 20px
        //   right 0
        //   top 18px
        //   background active-color
  .el-submenu__title
    span
      color #eee
    &:hover
      background transparent
      span
        color #fff
  .el-submenu
    .el-menu-item
      min-width 166px
      &.is-active
        &:before
          top 16px
  .main-content
    padding-top $fakeTitleBarHeight
    position relative
    box-sizing border-box
    z-index 10
    overflow hidden
    height 100%
    display flex
  .support
    text-align center
    &-title
      text-align center
      color #878d99
  .align-center
    input
      text-align center
  *::-webkit-scrollbar
    width 8px
    height 8px
  *::-webkit-scrollbar-thumb
    border-radius 4px
    background #6f6f6f
  *::-webkit-scrollbar-track
    background-color transparent
</style>

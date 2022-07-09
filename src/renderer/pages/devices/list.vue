<template>
  <div class="device-list">
    <el-button @click="getDevices">获取已经连接设备</el-button>
    <el-input v-model="ip"></el-input>
    <el-button @click="addDevices">添加设备</el-button>
    <el-button @click="removeDevices">断开设备</el-button>
    <el-button @click="toupin">开始投屏</el-button>
    <el-button @click="logcat">日志</el-button>
    <pre>{{stdout}}</pre>
  </div>
</template>

<script lang="ts">
// @ts-ignore
import { ipcRenderer } from 'electron'
import { Vue, Component } from 'vue-property-decorator'
const iconv = require('iconv-lite')
const exec = require('child_process').exec
@Component({
  name: 'devices-list'
})
export default class extends Vue {
  devicesList = []
  err = ''
  stdout = ''
  stderr = ''
  binaryEncoding = 'binary'
  encoding = 'cp936'
  ip = '192.168.31.196'
  port = '5555'
  adbBasePath = 'E:\\workbench\\coding\\sandBox\\android-tools\\public\\resources\\'

  getDevices () {
    try {
      const appPath = ipcRenderer.sendSync('getAppPath')
      console.log(appPath)
    } catch (e) {
      console.log('获取失败')
    }
    exec(
      this.adbBasePath + 'adb devices',
      {
        encoding: 'binary'
      },
      (err: any, stdout: any, stderr: any) => {
        if (err) {
          this.$message({
            message: this.iconvDecode(stderr),
            type: 'error'
          })
        } else {
          this.stdout = this.iconvDecode(stdout)
        }
      }
    )
  }

  addDevices () {
    exec(
      this.adbBasePath + `adb connect ${this.ip}:${this.port}`,
      {
        encoding: 'buffer'
      },
      (err, stdout, stderr) => {
        this.err = err
        this.stdout = stdout
        this.stderr = stderr
      }
    )
  }

  removeDevices () {
    exec(
      this.adbBasePath + `adb disconnect ${this.ip}:${this.port}`,
      {
        encoding: 'buffer'
      },
      (err, stdout, stderr) => {
        this.err = err
        this.stdout = stdout
        this.stderr = stderr
      }
    )
  }

  toupin () {
    console.log('开始投屏')
    exec(this.adbBasePath + 'scrcpy.exe')
  }

  logcat () {
    exec(
      this.adbBasePath + 'adb logcat *:W',
      {
        encoding: 'binary'
      },
      (err: any, stdout: any, stderr: any) => {
        console.log(err)
        if (err) {
          this.$message({
            message: this.iconvDecode(stderr),
            type: 'error'
          })
        } else {
          try {
            this.stdout = this.iconvDecode(stdout)
          } catch (e) {
            this.stdout = stdout
          }
        }
      }
    )
  }

  iconvDecode (str = '') {
    try {
      return iconv.decode(Buffer.from(str, 'binary'), 'cp936')
    } catch (e) {
      return str
    }
  }
}
</script>

<style lang="stylus" scoped>
.device-list {
  height: 100%;
  overflow: auto;
}
</style>

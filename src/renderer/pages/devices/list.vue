<template>
  <div class="device-list">
    <el-button @click="getDevices">获取已经连接设备</el-button>
    <el-input v-model="ip"></el-input>
    <el-button @click="addDevices">添加设备</el-button>
    <el-button @click="removeDevices">断开设备</el-button>
    <el-button @click="toupin">开始投屏</el-button>
    <pre>{{stdout}}</pre>
  </div>
</template>

<script>
const exec = require('child_process').exec
// const iconv = require('iconv-lite')
export default {
  name: 'DevicesList',
  data () {
    return {
      msg: 'asdfasdfasdf',
      devicesList: [],
      err: '',
      stdout: '',
      stderr: '',
      binaryEncoding: 'binary',
      encoding: 'cp936',
      ip: '192.168.31.196',
      port: '5555'
    }
  },
  methods: {
    getDevices () {
      exec(
        'adb devices',
        {
          encoding: 'binary'
        },
        (err, stdout, stderr) => {
          this.err = err
          this.stdout = stdout
          this.stderr = stderr
        }
      )
    },
    addDevices () {
      exec(
        `adb connect ${this.ip}:${this.port}`,
        {
          encoding: 'buffer'
        },
        (err, stdout, stderr) => {
          this.err = err
          this.stdout = stdout
          // this.stdout = iconv.decode(stdout, 'cp936')
          this.stderr = stderr
        }
      )
    },
    removeDevices () {
      exec(
        `adb disconnect ${this.ip}:${this.port}`,
        {
          encoding: 'buffer'
        },
        (err, stdout, stderr) => {
          this.err = err
          this.stdout = stdout
          // this.stdout = iconv.decode(stdout, 'cp936')
          this.stderr = stderr
        }
      )
    },
    toupin () {
      console.log('开始投屏')
      exec('scrcpy.exe')
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

<template>
  <div class="device-list">
    <el-button @click="getDevicesList">获取本机ip</el-button>
    <pre>{{err}}</pre>
    <pre>{{stdout}}</pre>
    <pre>{{stderr}}</pre>
  </div>
</template>

<script>
const exec = require('child_process').exec
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
      encoding: 'cp936'
    }
  },
  methods: {
    getDevicesList () {
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

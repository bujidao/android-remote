<template>
  <div class="device-list">
    <el-button @click="getDevicesList">获取本机ip</el-button>
    <pre>{{err}}</pre>
    <pre>{{stdout}}</pre>
    <pre>{{stderr}}</pre>
    <!-- <ul>
      <li v-for="(device, index) in devicesList" :key="index">
        {{ device }}
      </li>
    </ul> -->
  </div>
</template>

<script>
const exec = require('child_process').exec
// const iconv = require('iconv-lite')
// const { Buffer } = require('buffer')
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
        'ipconfig',
        {
          encoding: 'binary'
        },
        (err, stdout, stderr) => {
          this.err = err
          this.stdout = stdout
          this.stderr = stderr
        }
      )
      // const workerProcess = exec('ipconfig')
      // workerProcess.stdout.on('data', function (data) {
      //   this.msg = data
      // })
      // this.msg = workerProcess
    }
    // redeocde (stdout) {
    // const buf = new Buffer.from(stdout, this.binaryEncoding)
    // return iconv.decode(buf, this.encoding)
    // }
  }
}
</script>

<style lang="stylus" scoped>
.device-list {
  height: 100%;
  overflow: auto;
}
</style>

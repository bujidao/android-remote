<template>
  <div class="device-list">
    <el-button @click="getDevicesList">获取设备列表</el-button>
    <pre>{{msg}}</pre>
    <ul>
      <li v-for="(device, index) in devicesList" :key="index">
        {{ device }}
      </li>
    </ul>
  </div>
</template>

<script>
const exec = require('child_process').exec
export default {
  name: 'DevicesList',
  data () {
    return {
      msg: 'asdfasdfasdf',
      devicesList: []
    }
  },
  methods: {
    getDevicesList () {
      const workerProcess = exec('ipconfig')
      // workerProcess.stdout.on('data', function (data) {
      //   this.msg = data
      // })
      // workerProcess.stderr.on('data', function (data) {
      //   this.msg = data
      // })
      this.msg = workerProcess.stdout
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

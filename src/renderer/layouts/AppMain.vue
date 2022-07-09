<template>
  <div class="app-main">
    <transition name="app-fade" mode="out-in">
      <keep-alive>
        <router-view v-if="$route && $route.meta && $route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>
    <transition name="app-fade" mode="out-in">
      <router-view :key="$route.path" v-if="!($route && $route.meta && $route.meta.keepAlive)"></router-view>
    </transition>
  </div>
</template>

<script lang="ts">
import {
  Vue,
  Component
} from 'vue-property-decorator'

@Component({
  name: 'app-main'
})

export default class extends Vue {

}

</script>

<style lang="stylus" scoped>
.app-main {
  color: #dcdcaa;
  padding: 20px;
}
.app-fade{
  &-enter,
  &-leave,
  &-leave-active {
    opacity 0
  }
  &-enter-active,
  &-leave-active {
    transition all 100ms linear
  }
}
</style>

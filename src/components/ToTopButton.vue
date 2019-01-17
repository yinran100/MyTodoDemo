<template>
  <transition name="fade">
    <el-button
      v-show="showButton"
      icon="el-icon-caret-top"
      circle
      @click="scrollToTop"
    ></el-button>
  </transition>
</template>

<script>
export default {
  props: {
    getTarger: {
      type: Function,
      default: () => document.documentElement
    }
  },
  data() {
    return {
      showButton: false,
      scrollTop: 0,
      timer: null
    };
  },
  computed: {
    target() {
      return this.getTarger();
    },
    eventerListener() {
      return this.target === document.documentElement ? document : this.target;
    }
  },
  mounted() {
    this.eventerListener.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    this.eventerListener.removeEventListener("scroll", this.handleScroll);
    if (this.timer) {
      clearTimeout(this.timer);
    }
  },
  methods: {
    handleScroll() {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => {
        const top = this.target.scrollTop; //滚动距离
        this.showButton = top > this.target.clientHeight * 0.5;
        // console.log(top);
      }, 16);
    },
    scrollToTop() {
      let target = this.target;
      let distance = target.scrollTop; //获得当前高度
      let step = distance / 10; //每步的距离
      (function jump() {
        if (distance > 0) {
          distance -= step;
          target.scrollTo(0, distance);
          return setTimeout(jump, 16);
        }
      })();
    }
  }
};
</script>

<style lang="stylus" scoped>
.fade-leave-active
  opacity: 0.8
  transform: translate(0, -100%)

.fade-enter, .fade-leave-to
  opacity: 0
  transform: translate(0, -100%)

.el-button
  position: fixed
  right: 80px
  bottom: 150px
  z-index: 5
  color: #209EF2
  font-size: 18px
  transition: all 0.3s ease
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.12)
</style>

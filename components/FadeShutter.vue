<template lang="pug">
  div(:class="`shutter ${isOpen ? 'open' : ''}`" ref='shutter')
    .shutter__top
    .shutter__bottom
</template>

<script>
export default {
  props: {
    timeout: {
      type: Number,
      default: 1000
    }
  },
  data() {
    return {
      isOpen: false
    }
  },
  mounted() {
    const shutter = this.$refs.shutter

    setTimeout(() => {
      this.isOpen = true

      setTimeout(() => {
        shutter.classList.add('hidden')
      }, 800)
    }, this.timeout + 500)
  }
}
</script>

<style lang="scss" scoped>
.shutter {
  top: 0;
  left: 0;
  position: fixed;
  height: 100%;
  width: 100%;
  z-index: 100;

  &.open {
    .shutter__top {
      transform: translateY(calc(-100% - 200px));
    }

    .shutter__bottom {
      transform: translateY(calc(100% + 200px));
    }
  }

  &__top {
    position: relative;
    margin-bottom: calc(90px * 2);
    width: 100%;
    height: calc(var(--vh, 1vh) * 50 - 90px);
    background-color: $color-orange;
    transform: translateY(0%);
    transition: transform 0.8s ease;

    &::before {
      content: '';
      position: absolute;
      top: calc(var(--vh, 1vh) * 50 - 90px);
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 0 100vw 200px 0;
      border-color: transparent $color-orange transparent transparent;
    }
  }

  &__bottom {
    position: relative;
    width: 100%;
    height: calc(var(--vh, 1vh) * 50 - 90px);
    background-color: $color-orange;
    transform: translateY(0%);
    transition: transform 0.8s ease;

    &::before {
      content: '';
      position: absolute;
      bottom: calc(var(--vh, 1vh) * 50 - 90px);
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 200px 0 0 100vw;
      border-color: transparent transparent transparent $color-orange;
    }
  }
}
</style>

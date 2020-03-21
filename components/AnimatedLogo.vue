<template lang="pug">
  .animated(ref="animationPanel")
    .animated__bar
    .animated__logo
      img(src="~/assets/images/sushi/sushi.svg")
    .animated__logo-text
      span S
      span U
      span S
      span H
      span I
      span Server

</template>

<script>
export default {
  props: {
    timeout: {
      type: Number,
      default: 4500
    }
  },
  mounted() {
    const animations = this.$refs.animationPanel

    setTimeout(() => {
      animations.classList.add('hidden')
    }, this.timeout)
  }
}
</script>

<style lang="scss" scoped>
.animated {
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  z-index: 101;

  &__bar {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    background-color: $color-white;
    height: 0;
    width: 100%;
    animation: expand 2.5s 1s ease forwards;
  }

  &__logo {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    min-height: calc(var(--vh, 1vh) * 100);
    transform: translateX(calc(100% - 100px));
    animation: slide 2.5s 1s linear forwards;

    img {
      height: 100px;
      object-fit: contain;
    }
  }

  &__logo-text {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: blow 1.5s 3.5s ease forwards;

    span {
      transform: rotateX(90deg);
      font-size: 30px;
      color: $color-white;
      letter-spacing: 2px;
      font-weight: 700;
      filter: drop-shadow(3px 3px 0px #000000);

      &:last-of-type {
        margin-left: 10px;
      }

      @for $i from 1 through 6 {
        &:nth-of-type(#{$i}) {
          animation: flip 0.2s calc(3.5s + #{$i} * 0.1s) ease forwards;
        }
      }
    }
  }
}

@keyframes expand {
  0% {
    height: 0px;
  }

  10% {
    height: 140px;
  }

  90% {
    height: 140px;
  }

  100% {
    height: 0px;
  }
}

@keyframes slide {
  0% {
    transform: translateX(-100%);
  }

  100% {
    transform: translateX(calc(100%));
  }
}

@keyframes flip {
  0% {
    transform: rotateX(90deg);
  }

  100% {
    transform: rotateX(0deg);
  }
}

@keyframes blow {
  0% {
    transform: scale(1);
  }

  85% {
    transform: scale(1.2);
  }

  100% {
    transform: scale(0);
  }
}
</style>

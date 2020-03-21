<template lang="pug">
  nuxt-link(:to="{name: 'lol-champion', params: {champion: link}}")
    .card
      img.card__image(:src="urlizedThumbnail")
      div.card__text
        span.card__text__title-en {{ nameEN }}
        span.card__text__title-jp {{ nameJP }}
</template>

<script>
export default {
  props: {
    id: {
      required: true,
      type: String
    },
    nameEN: {
      required: true,
      type: String
    },
    nameJP: {
      required: true,
      type: String
    },
    link: {
      required: true,
      type: String
    }
  },
  computed: {
    urlizedThumbnail() {
      return `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${this.id}_0.jpg`
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  width: 100%;
  position: relative;
  overflow: hidden;
  border-radius: 5px;
  filter: drop-shadow(0px 0px 8px $color-gray);

  &::before {
    content: '';
    position: absolute;
    height: 160px;
    width: 160px;
    right: 0;
    bottom: 0;
    transform: translate(50%, 50%);
    background-color: transparentize($color: $color-darkgray, $amount: 0.2);
    border-radius: 100%;
    z-index: 1;
    transition: 0.2s ease;
  }

  &__image {
    position: relative;
    object-fit: cover;
    width: 100%;
    vertical-align: top;
    filter: grayscale(1);
    transition: filter 0.4s ease;
  }

  &__text {
    position: absolute;
    bottom: 20px;
    right: 20px;
    text-align: right;
    letter-spacing: 1px;
    color: $color-white;
    z-index: 2;

    &__title-en {
      position: relative;
      display: block;
      font-size: 28px;
      font-weight: 600;
      margin-right: 0px;
      transition: margin 0.2s ease;

      &:after {
        content: '➔';
        position: absolute;
        opacity: 0;
        vertical-align: top;
        margin-left: 10px;
        transition: opacity 0.2s ease;
      }
    }

    &__title-jp {
      display: block;
      font-size: 16px;
      font-weight: 600;
    }
  }
}

a {
  text-decoration: none;

  &:hover,
  &:focus {
    .card {
      &:before {
        transform: translate(50%, 50%) scale(2);
        background: transparentize($color: $color-lightblack, $amount: 0.5);
      }

      &__image {
        filter: grayscale(0);
      }

      &__text {
        &__title-en {
          margin-right: 40px;

          &:after {
            opacity: 1;
          }
        }
      }
    }
  }
}
</style>

<template lang="pug">
  .champion
    .champion__hero
      img.champion__hero__img(:src="urlizedThumbnail")
      .champion__hero__bio
        .inner-margin
          span.champion__hero__bio__name {{championData.name}}
          span.champion__hero__bio__title {{championData.title}}
</template>

<script>
export default {
  async asyncData({ env, params, $axios }) {
    const championStaticData = await $axios.$get(`/api/champions`)
    const currentChampion = championStaticData[params.champion]

    return {
      championData: currentChampion
    }
  },
  computed: {
    urlizedThumbnail() {
      return `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${this.championData.id}_0.jpg`
    }
  }
}
</script>

<style lang="scss" scoped>
.champion {
  &__hero {
    position: relative;
    height: 100vh;
    height: calc(var(--vh, 1vh) * 100);

    &__img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    &__bio {
      position: absolute;
      background-color: transparentize($color: $color-black, $amount: 0.6);
      bottom: 0px;
      width: 100%;
      left: 50%;
      transform: translateX(-50%);

      @media screen and (min-width: $pc) {
        bottom: unset;
        left: unset;
        top: 0;
        right: 0;
        padding: 0 40px;
        width: 100vh;
        width: calc(var(--vh, 1vh) * 100);
        transform-origin: right top;
        transform: rotateZ(-90deg) translateX(0px) translateY(-100%);
      }

      .inner-margin {
        padding: 40px 0;
      }

      &__name {
        display: block;
        letter-spacing: 3px;
        font-size: 60px;
        font-weight: 600;
        color: $color-white;
        text-transform: uppercase;
      }

      &__title {
        display: block;
        font-weight: 600;
        font-size: 18px;
        color: $color-white;
        letter-spacing: 1px;
      }
    }
  }
}
</style>

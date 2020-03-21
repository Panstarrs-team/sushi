<template lang="pug">
  .lol
    .lol__champion-list
      ChampionCard(v-for="(champion, key) in championArray" :key="key" :id="champion.data.id" :nameEN="champion.data.id" :nameJP="champion.data.name" :link="champion.data.id")
</template>

<script>
import ChampionCard from '~/components/lol/ChampionCard.vue'

export default {
  components: {
    ChampionCard
  },
  async asyncData({ $axios }) {
    const championData = await $axios.$get(`/api/champions`)

    return {
      champions: championData
    }
  },
  computed: {
    championArray() {
      const result = []

      Object.keys(this.champions).forEach((champion) => {
        const championItem = { data: {} }
        championItem.data = this.champions[champion]
        result.push(championItem)
      })

      return result
    }
  }
}
</script>

<style lang="scss">
.lol {
  padding-top: 120px;

  &__champion-list {
    max-width: $pc;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 30px;
  }
}
</style>

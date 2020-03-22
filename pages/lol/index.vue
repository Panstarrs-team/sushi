<template lang="pug">
  .lol
    SearchInput(v-on:updateFilter="filterRole($event)")
    .lol__champion-list
      ChampionCard(v-for="(champion, key) in championArray" :key="key" :champion="champion.data" :filter="filter")
</template>

<script>
import ChampionCard from '~/components/lol/ChampionCard.vue'
import SearchInput from '~/components/lol/SearchInput.vue'

export default {
  components: {
    ChampionCard,
    SearchInput
  },
  async asyncData({ $axios }) {
    const championData = await $axios.$get(`/api/champions`)

    return {
      champions: championData
    }
  },
  data() {
    return {
      filter: {
        roles: []
      }
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
  },
  methods: {
    filterRole(role) {
      this.filter.roles = role
    }
  }
}
</script>

<style lang="scss">
.lol {
  padding: 120px 0 40px 0;

  @media screen and (max-width: $tablet) {
    padding: 80px 20px 40px 20px;
  }

  &__champion-list {
    max-width: $pc;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 30px;

    @media screen and (max-width: $tablet) {
      grid-template-columns: repeat(1, 1fr);
    }
  }
}
</style>
